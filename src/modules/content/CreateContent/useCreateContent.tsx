import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import {NavigationStackProp} from '../../../navigation/routes';
import {useContent} from '../../../contexts/ContentContext';
import {CreateContentRequest} from '../../../types/content';

const useCreateContent = () => {
  const navigation = useNavigation<NavigationStackProp>();
  const {categories, loadCategories, createContent} = useContent();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCreateContent = useCallback(
    async (contentData: CreateContentRequest) => {
      try {
        await createContent(contentData);
        navigation.navigate('MainTabs', {screen: 'Contents'});
      } catch (error) {
        console.error('Error creating content:', error);
        throw error;
      }
    },
    [createContent, navigation],
  );

  const goBack = useCallback(() => {
    navigation.navigate('MainTabs', {screen: 'Contents'});
  }, [navigation]);

  return {
    categories,
    handleCreateContent,
    goBack,
  };
};

export default useCreateContent;
