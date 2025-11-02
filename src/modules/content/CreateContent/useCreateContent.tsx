import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import {CreateContentRequest} from '../../../types/content';
import useContentQueries from '../services/contentQueryFactory';

const useCreateContent = () => {
  const navigation = useNavigation<NavigationStackProp>();
  const {user} = useAuth();

  const contentQueries = useContentQueries(['content']);
  const {data: categories = [], isLoading: isLoadingCategories} =
    contentQueries.getCategories();

  const createContentMutation = contentQueries.createContent();

  const handleCreateContent = useCallback(
    async (contentData: CreateContentRequest) => {
      try {
        await createContentMutation.mutateAsync({
          contentData,
          userId: user?.id.toString() || '',
        });
      } catch (error) {
        console.error('Error creating content:', error);
        throw error;
      }
    },
    [createContentMutation, navigation, user],
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    categories,
    handleCreateContent,
    goBack,
    isLoading: createContentMutation.isPending,
    error: createContentMutation.error?.message,
  };
};

export default useCreateContent;
