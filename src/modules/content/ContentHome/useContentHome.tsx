import {useCallback, useEffect, useMemo} from 'react';
import {BadgeProps} from '../../../components/Badge/Badge';
import {ContentCardProps} from '../../../components/ContentCard/ContentCard';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useContent} from '../../../contexts/ContentContext';

const useContentHome = () => {
  const {contents, categories, loadContents,loadCategories, isLoading, error} = useContent();
  const {navigate} = useNavigation<NavigationStackProp>();

  useEffect(() => {
    loadContents();
    loadCategories();
  }, [loadContents, loadCategories]);

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
      image: {uri: content.coverUrl},
      badgeLabel: content.category.name,
      title: content.title,
      description: content.description,
      onClick: () => handleCardClick(content.id),
    }));
  }, [contents, handleCardClick]);

  return {
    badgeList,
    contentCardList,
    navigateToDetails,
    handleCardClick,
    navigateToCreateContent,
    isLoading,
    error,
    refreshContents: () => loadContents(),
  };
};

export default useContentHome;
