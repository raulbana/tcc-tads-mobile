import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ContentTabs from './components/ContentTabs/ContentTabs';
import SavedContentList from './components/SavedContentList/SavedContentList';
import OwnContentList from './components/OwnContentList/OwnContentList';
import useProfile from './useProfile';
import * as S from './styles';

const Profile: React.FC = () => {
  const {
    user,
    posts,
    savedContent,
    activeTab,
    isLoading,
    isDeleting,
    handleDeletePost,
    handleEditProfile,
    handleRefresh,
    handleUnsaveContent,
    handleEditContent,
    handleContentPress,
    handleTabChange,
    DialogPortal,
    stats,
  } = useProfile();

  const theme = useDynamicTheme();

  if (isLoading) {
    return (
      <ScreenContainer
        goBack={handleEditProfile}
        goBackTo="Configurações"
        headerShown={true}>
        <S.LoadingContainer>
          <S.LoadingText
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_06}
            text="Carregando perfil..."
          />
        </S.LoadingContainer>
      </ScreenContainer>
    );
  }

  if (!user) {
    return (
      <ScreenContainer
        goBack={handleEditProfile}
        goBackTo="Configurações"
        headerShown={true}>
        <S.ErrorContainer>
          <S.ErrorText
            typography={theme.typography.paragraph.r2}
            color={theme.colors.error}
            text="Erro ao carregar dados do usuário"
          />
        </S.ErrorContainer>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      goBack={handleEditProfile}
      goBackTo="Configurações"
      headerShown={true}>
      <S.Wrapper>
        <ProfileHeader
          user={user}
          onEditProfile={handleEditProfile}
          stats={stats}
        />

        <ContentTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'saved' ? (
          <SavedContentList
            savedContent={savedContent}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onUnsaveContent={handleUnsaveContent}
          />
        ) : (
          <OwnContentList
            ownContent={posts}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onEditContent={handleEditContent}
            onDeleteContent={handleDeletePost}
            onContentPress={handleContentPress}
          />
        )}
        {DialogPortal}
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default Profile;
