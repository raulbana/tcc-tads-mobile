import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import useContentQueries from '../services/contentQueryFactory';

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

  const badgeList = useMemo(() => {
    return categories.map(category => ({
      content: category.name,
    }));
  }, [categories]);

  const contentCardList = useMemo(() => {
    return contents.map(content => ({
      image: {uri: content.cover?.url},
      badgeLabel: content?.categories?.length > 0 ? content.categories[0] : 'Sem categoria',
      title: content.title,
      description: content.description,
      onClick: () => handleCardClick(content.id),
    }));
  }, [contents, handleCardClick]);

  const isLoading = isLoadingContents || isLoadingCategories;
  const error = contentsError?.message || categoriesError?.message;

  return {
    badgeList,
    contentCardList,
    navigateToDetails,
    handleCardClick,
    navigateToCreateContent,
    isLoading,
    error,
    refreshContents: refetchContents,
  };
};

export default useContentHome;
