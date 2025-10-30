import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {NavigationStackProp} from '../../../navigation/routes';
import {useContent} from '../../../contexts/ContentContext';
import {Content} from '../../../types/content';
import {useAuth} from '../../../contexts/AuthContext';
import useContentQueries from '../../content/services/contentQueryFactory';

const useEditContent = () => {
  const navigation = useNavigation<NavigationStackProp>();
  const route = useRoute();
  const {user} = useAuth();
  const {categories, loadCategories, updateContent} = useContent();
  const [content, setContent] = useState<Content | null>(null);

  const contentQueries = useContentQueries(['content']);
  const contentId = (route.params as any)?.contentId;

  const {
    data: contentData,
    isLoading: isLoadingById,
    error: errorById,
  } = contentQueries.getById(contentId || '', user?.id.toString() || '');

  const {
    data: contentsList = [],
    isLoading: isLoadingList,
    error: errorList,
  } = contentQueries.getList(user?.id.toString() || '', false);

  const isLoading = isLoadingById || isLoadingList;
  const error = errorById || errorList;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (contentData) {
      setContent(contentData);
    }
  }, [contentData]);

  const handleSelectContent = useCallback((selected: Content) => {
    setContent(selected);
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateContent = useCallback(
    async (contentData: any) => {
      if (!content) return;

      try {
        await updateContent(content.id, contentData);
        navigation.goBack();
      } catch (error) {
        console.error('Error updating content:', error);
      }
    },
    [content, updateContent, navigation],
  );

  return {
    content,
    categories,
    goBack,
    handleUpdateContent,
    contentsList,
    isLoading,
    error,
    handleSelectContent,
    hasContentId: !!contentId,
  };
};

export default useEditContent;
