import React from 'react';
import {Image, TouchableOpacity, Alert} from 'react-native';
import {Camera, Trash} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import AnonymousUserProfileImage from '../../../../../assets/illustrations/anonymous_user.svg';
import * as S from './styles';
import {useProfileImageUpload} from '../../hooks/useProfileImageUpload';

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
  const {selectedImage, error, pickImage, removeImage} =
    useProfileImageUpload();

  // Usar a imagem selecionada ou a atual
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
    Alert.alert(
      'Remover Foto',
      'Tem certeza que deseja remover a foto do perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            removeImage();
            onRemovePicture();
          },
        },
      ],
    );
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
    </S.Container>
  );
};

export default ProfilePictureSection;
