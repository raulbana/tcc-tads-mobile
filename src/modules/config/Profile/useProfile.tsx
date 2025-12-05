import {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../contexts/AuthContext';
import {NavigationStackProp} from '../../../navigation/routes';
import {Content} from '../../../types/content';
import {ContentTab} from './components/ContentTabs/ContentTabs';
import useProfileQueries from './services/profileQueryFactory';
import useDialogModal from '../../../hooks/useDialogModal';

const useProfile = () => {
  const {user} = useAuth();
  const {navigate, goBack} = useNavigation<NavigationStackProp>();

  const [activeTab, setActiveTab] = useState<ContentTab>('own');

  const profileQueries = useProfileQueries(['profile']);
  const {
    data: allPosts = [],
    isLoading: isLoadingPosts,
    error: postsError,
    refetch: refetchPosts,
  } = profileQueries.useGetUserContent(user?.id.toString() || '');

  // Filtrar apenas conteúdos do usuário logado para garantir que não venham conteúdos de outros usuários
  const posts = allPosts.filter(post => {
    if (!user?.id || !post.author) return false;
    return post.author.id === user.id || Number(post.author.id) === user.id;
  });

  const {
    data: savedContent = [],
    isLoading: isLoadingSaved,
    error: savedError,
    refetch: refetchSaved,
  } = profileQueries.useGetSavedContent(user?.id.toString() || '');

  const deleteContentMutation = profileQueries.useDeleteContent();
  const unsaveContentMutation = profileQueries.useUnsaveContent();
  const {DialogPortal, showDialog} = useDialogModal();

  const handleDeletePost = useCallback(
    async (postId: string) => {
      showDialog({
        title: 'Excluir Postagem',
        description:
          'Tem certeza que deseja excluir esta postagem? Esta ação não pode ser desfeita.',
        secondaryButton: {
          label: 'Cancelar',
          onPress: () => {},
        },
        primaryButton: {
          label: 'Excluir',
          onPress: async () => {
            try {
              await deleteContentMutation.mutateAsync(postId);
              showDialog({
                title: 'Sucesso',
                description: 'Postagem excluída com sucesso!',
                primaryButton: {
                  label: 'OK',
                  onPress: () => {},
                },
              });
            } catch (error) {
              console.error('Error deleting post:', error);
              showDialog({
                title: 'Erro',
                description: 'Ocorreu um erro ao excluir a postagem.',
                primaryButton: {
                  label: 'OK',
                  onPress: () => {},
                },
              });
            }
          },
          type: 'PRIMARY',
          autoClose: true,
        },
        dismissOnBackdropPress: false,
      });
    },
    [deleteContentMutation, showDialog],
  );

  const handleEditProfile = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUnsaveContent = useCallback(
    async (contentId: string) => {
      showDialog({
        title: 'Remover dos Salvos',
        description: 'Tem certeza que deseja remover este conteúdo dos salvos?',
        secondaryButton: {
          label: 'Cancelar',
          onPress: () => {},
        },
        primaryButton: {
          label: 'Remover',
          onPress: async () => {
            try {
              await unsaveContentMutation.mutateAsync(contentId);
              showDialog({
                title: 'Sucesso',
                description: 'Conteúdo removido dos salvos!',
                primaryButton: {
                  label: 'OK',
                  onPress: () => {},
                },
              });
            } catch (error) {
              console.error('Error unsaving content:', error);
              showDialog({
                title: 'Erro',
                description: 'Ocorreu um erro ao remover o conteúdo.',
                primaryButton: {
                  label: 'OK',
                  onPress: () => {},
                },
              });
            }
          },
        },
        dismissOnBackdropPress: false,
      });
    },
    [unsaveContentMutation, showDialog],
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

  // Calcular estatísticas
  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likesCount || 0),
    0,
  );
  const totalPosts = posts.length;
  const totalSaved = savedContent.length;

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
    DialogPortal,
    stats: {
      likes: totalLikes,
      posts: totalPosts,
      saved: totalSaved,
    },
  };
};

export default useProfile;
