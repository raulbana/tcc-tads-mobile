import React, {useCallback} from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../components/Label/Label';
import ProfileForm from './components/ProfileForm/ProfileForm';
import ProfilePictureSection from './components/ProfilePictureSection/ProfilePictureSection';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import useEditProfile from './useEditProfile';
import * as S from './styles';

const EditProfile: React.FC = () => {
  const {
    user,
    isLoading,
    isSaving,
    errors,
    isValid,
    register,
    control,
    handleSaveProfile,
    handleCancel,
    handleProfilePictureChange,
    handleRemoveProfilePicture,
    goBack,
    DialogPortal,
  } = useEditProfile();

  const theme = useDynamicTheme();

  const handlePictureChange = useCallback(
    (fileSize: number, fileName: string, imageUri: string) => {
      handleProfilePictureChange(imageUri);
    },
    [handleProfilePictureChange],
  );

  if (isLoading) {
    return (
      <ScreenContainer>
        <S.LoadingContainer>
          <Label
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
      <ScreenContainer>
        <S.ErrorContainer>
          <Label
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
      scrollable
      goBack={goBack}
      goBackTo="Perfil"
      headerShown={true}>
      <S.Wrapper>
        <S.Header>
          <Label
            typography={theme.typography.title.b3}
            color={theme.colors.gray_08}
            text="Editar Perfil"
          />
        </S.Header>

        <S.ProfileSection>
          <ProfilePictureSection
            currentPicture={user.profilePictureUrl}
            onPictureChange={handlePictureChange}
            onRemovePicture={handleRemoveProfilePicture}
          />
        </S.ProfileSection>

        <S.FormSection>
          <ProfileForm
            errors={errors}
            isValid={isValid}
            register={register}
            control={control}
            isSaving={isSaving}
            onSave={handleSaveProfile}
            onCancel={handleCancel}
          />
        </S.FormSection>
      </S.Wrapper>
        {DialogPortal}
    </ScreenContainer>
  );
};

export default EditProfile;
