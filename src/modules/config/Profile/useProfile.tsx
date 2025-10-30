import {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useAuth} from '../../../contexts/AuthContext';
import {NavigationStackProp} from '../../../navigation/routes';
import {Content} from '../../../types/content';
import {ContentTab} from './components/ContentTabs/ContentTabs';
import useProfileQueries from './services/profileQueryFactory';

const useProfile = () => {
  const {user} = useAuth();
  const {navigate, goBack} = useNavigation<NavigationStackProp>();

  const [activeTab, setActiveTab] = useState<ContentTab>('own');

  const profileQueries = useProfileQueries(['profile']);
  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    error: postsError,
    refetch: refetchPosts,
  } = profileQueries.useGetUserContent(user?.id.toString() || '');

  const {
    data: savedContent = [],
    isLoading: isLoadingSaved,
    error: savedError,
    refetch: refetchSaved,
  } = profileQueries.useGetSavedContent(user?.id.toString() || '');

  const deleteContentMutation = profileQueries.useDeleteContent();
  const unsaveContentMutation = profileQueries.useUnsaveContent();

  const handleDeletePost = useCallback(
    async (postId: string) => {
      Alert.alert(
        'Excluir Postagem',
        'Tem certeza que deseja excluir esta postagem? Esta ação não pode ser desfeita.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteContentMutation.mutateAsync(postId);
                Alert.alert('Sucesso', 'Postagem excluída com sucesso!');
              } catch (error) {
                console.error('Error deleting post:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao excluir a postagem.');
              }
            },
          },
        ],
      );
    },
    [deleteContentMutation],
  );

  const handleEditProfile = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUnsaveContent = useCallback(
    async (contentId: string) => {
      Alert.alert(
        'Remover dos Salvos',
        'Tem certeza que deseja remover este conteúdo dos salvos?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Remover',
            style: 'destructive',
            onPress: async () => {
              try {
                await unsaveContentMutation.mutateAsync(contentId);
                Alert.alert('Sucesso', 'Conteúdo removido dos salvos!');
              } catch (error) {
                console.error('Error unsaving content:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao remover o conteúdo.');
              }
            },
          },
        ],
      );
    },
    [unsaveContentMutation],
  );

  const handleEditContent = useCallback(
    (content: Content) => {
      navigate('Config', {
        screen: 'EditContent' as any,
        params: {contentId: content.id},
      });
    },
    [navigate],
  );

  const handleContentPress = useCallback(
    (content: Content) => {
      navigate('Content', {
        screen: 'ContentDetails',
        params: {contentId: content.id},
      });
    },
    [navigate],
  );

  const handleTabChange = useCallback((tab: ContentTab) => {
    setActiveTab(tab);
  }, []);

  const handleRefresh = useCallback(() => {
    if (activeTab === 'saved') {
      refetchSaved();
    } else {
      refetchPosts();
    }
  }, [activeTab, refetchSaved, refetchPosts]);

  const isLoading =
    isLoadingPosts ||
    isLoadingSaved ||
    deleteContentMutation.isPending ||
    unsaveContentMutation.isPending;

  const error = postsError?.message || savedError?.message;

  return {
    user,
    posts,
    savedContent,
    activeTab,
    isLoading,
    isDeleting: deleteContentMutation.isPending,
    handleDeletePost,
    handleEditProfile,
    handleRefresh,
    handleUnsaveContent,
    handleEditContent,
    handleContentPress,
    handleTabChange,
    error,
  };
};

export default useProfile;
