import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Camera, Trash} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import AnonymousUserProfileImage from '../../../../../assets/illustrations/anonymous_user.svg';
import * as S from './styles';
import {useProfileImageUpload} from '../../hooks/useProfileImageUpload';
import useDialogModal from '../../../../../hooks/useDialogModal';

export interface ProfilePictureSectionProps {
  currentPicture?: string;
  onPictureChange: (
    fileSize: number,
    fileName: string,
    imageUri: string,
  ) => void;
  onRemovePicture: () => void;
}

const ProfilePictureSection: React.FC<ProfilePictureSectionProps> = ({
  currentPicture,
  onPictureChange,
  onRemovePicture,
}) => {
  const theme = useDynamicTheme();
  const {DialogPortal, showDialog} = useDialogModal();
  const {selectedImage, error, pickImage, removeImage} =
    useProfileImageUpload({showDialog});

  const displayImage = selectedImage?.uri || currentPicture;
  const hasProfilePicture = displayImage && displayImage.trim() !== '';

  const handleImagePicker = async () => {
    await pickImage();
  };

  React.useEffect(() => {
    if (selectedImage) {
      onPictureChange(
        selectedImage.fileSize,
        selectedImage.fileName,
        selectedImage.uri,
      );
    }
  }, [selectedImage]);

  const handleRemovePicture = () => {
    showDialog({
      title: 'Remover Foto',
      description: 'Tem certeza que deseja remover a foto do perfil?',
      secondaryButton: {
        label: 'Cancelar',
        onPress: () => {},
      },
      primaryButton: {
        label: 'Remover',
        onPress: () => {
          removeImage();
          onRemovePicture();
        },
      },
    });
  };

  return (
    <S.Container>
      <S.AvatarContainer>
        {hasProfilePicture ? (
          <Image source={{uri: displayImage}} style={S.profileImageStyle} />
        ) : (
          <AnonymousUserProfileImage width={80} height={80} />
        )}
      </S.AvatarContainer>

      <S.ActionsContainer>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={S.actionButtonStyle}>
          <Camera size={20} color={theme.colors.purple_04} weight="bold" />
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.purple_04}
            text="Alterar Foto"
          />
        </TouchableOpacity>

        {hasProfilePicture && (
          <TouchableOpacity
            onPress={handleRemovePicture}
            style={S.removeButtonStyle}>
            <Trash size={20} color={theme.colors.error} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sb2}
              color={theme.colors.error}
              text="Remover"
            />
          </TouchableOpacity>
        )}
      </S.ActionsContainer>

      {error && (
        <Label
          typography={theme.typography.paragraph.sm1}
          color={theme.colors.error}
          text={error}
        />
      )}
      {DialogPortal}
    </S.Container>
  );
};

export default ProfilePictureSection;
