import {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import useContentQueries from '../services/contentQueryFactory';
import {Content} from '../../../types/content';

const useContentHome = () => {
  const {user} = useAuth();
  const {navigate} = useNavigation<NavigationStackProp>();

  const contentQueries = useContentQueries(['content']);
  const {
    data: contents = [],
    isLoading: isLoadingContents,
    error: contentsError,
    refetch: refetchContents,
  } = contentQueries.getList(user?.id.toString() || '', false);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = contentQueries.getCategories();

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const handleCardClick = useCallback(
    (contentId: string) => {
      navigate('Content', {screen: 'ContentDetails', params: {contentId}});
    },
    [navigate],
  );

  const navigateToCreateContent = useCallback(() => {
    navigate('Content', {screen: 'CreateContent'});
  }, [navigate]);

  const navigateToDetails = useCallback(() => {
    navigate('Content', {screen: 'ContentDetails', params: {contentId: '1'}});
  }, [navigate]);

  const toggleCategorySelection = useCallback((categoryId: number) => {
    setSelectedCategoryIds(prevIds =>
      prevIds.includes(categoryId)
        ? prevIds.filter(id => id !== categoryId)
        : [...prevIds, categoryId],
    );
  }, []);

  const mapContentToCard = useCallback(
    (content: Content) => ({
      id: content.id,
      image: {uri: content.cover?.url},
      badgeLabel:
        content?.categories?.length > 0
          ? content.categories[0]
          : 'Sem categoria',
      title: content.title,
      description: content.description,
      onClick: () => handleCardClick(content.id),
    }),
    [handleCardClick],
  );

  const badgeList = useMemo(() => {
    return categories.map(category => ({
      content: category.name,
      onPress: () => toggleCategorySelection(category.id),
      isActive: selectedCategoryIds.includes(category.id),
    }));
  }, [categories, selectedCategoryIds, toggleCategorySelection]);

  const contentCardList = useMemo(() => {
    return contents.map(mapContentToCard);
  }, [contents, mapContentToCard]);

  const selectedCategoryNames = useMemo(() => {
    const categoryMap = new Map(categories.map(category => [category.id, category.name]));
    return selectedCategoryIds
      .map(id => categoryMap.get(id))
      .filter((name): name is string => Boolean(name));
  }, [categories, selectedCategoryIds]);

  const hasActiveFilters = selectedCategoryIds.length > 0;

  const selectedNamesSet = useMemo(
    () => new Set(selectedCategoryNames),
    [selectedCategoryNames],
  );

  const filteredContentCardList = useMemo(() => {
    if (!hasActiveFilters) {
      return [];
    }

    return contents
      .filter(content =>
        content.categories?.some(categoryName => selectedNamesSet.has(categoryName)),
      )
      .map(mapContentToCard);
  }, [contents, hasActiveFilters, mapContentToCard, selectedNamesSet]);

  const contentSections = useMemo(() => {
    // Agrupar conteúdos por seção
    const sectionMap = new Map<string, Map<string, Content>>();

    contents.forEach((content) => {
      if (content.section && content.section.length > 0) {
        content.section.forEach((sectionName) => {
          if (!sectionMap.has(sectionName)) {
            sectionMap.set(sectionName, new Map());
          }
          // Usar Map para evitar duplicatas dentro da mesma seção
          const sectionContents = sectionMap.get(sectionName)!;
          if (!sectionContents.has(content.id)) {
            sectionContents.set(content.id, content);
          }
        });
      }
    });

    // Converter Map para array de seções
    const sections = Array.from(sectionMap.entries()).map(([title, contentsMap]) => ({
      title,
      contents: Array.from(contentsMap.values()).map(mapContentToCard),
    }));

    // Filtrar seções vazias
    return sections.filter((section) => section.contents.length > 0);
  }, [contents, mapContentToCard]);

  const isLoading = isLoadingContents || isLoadingCategories;
  const error = contentsError?.message || categoriesError?.message;

  return {
    badgeList,
    contentCardList,
    filteredContentCardList,
    contentSections,
    hasActiveFilters,
    navigateToDetails,
    handleCardClick,
    navigateToCreateContent,
    isLoading,
    error,
    refreshContents: refetchContents,
  };
};

export default useContentHome;
