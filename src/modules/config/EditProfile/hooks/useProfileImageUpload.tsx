import {useState, useCallback} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {DialogOptions} from '../../../../hooks/useDialogModal';

export type ProfileImageFile = {
  id: string;
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
};

interface ProfileImageUploadOptions {
  showDialog?: (options: DialogOptions) => void;
}

export function useProfileImageUpload(options?: ProfileImageUploadOptions) {
  const [selectedImage, setSelectedImage] = useState<ProfileImageFile | null>(
    null,
  );
  const [error, setError] = useState<string>('');
  const showDialog = options?.showDialog;

  const pickImage = useCallback(async () => {
    try {
      setError('');

      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      });

      if (result.didCancel) return;

      const asset = result.assets?.[0];
      if (!asset) return;

      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
        const fileSizeMB = (asset.fileSize / 1024 / 1024).toFixed(2);
        const errorMsg = `Imagem muito grande (${fileSizeMB}MB). Máximo: 5MB`;
        setError(errorMsg);
        showDialog?.({
          title: 'Imagem muito grande',
          description: errorMsg,
          primaryButton: {
            label: 'OK',
            onPress: () => {},
          },
        });
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (asset.type && !allowedTypes.includes(asset.type)) {
        const errorMsg = 'Formato não suportado. Use JPG ou PNG';
        setError(errorMsg);
        showDialog?.({
          title: 'Formato inválido',
          description: errorMsg,
          primaryButton: {
            label: 'OK',
            onPress: () => {},
          },
        });
        return;
      }

      const newImage: ProfileImageFile = {
        id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        uri: asset.uri!,
        type: asset.type!,
        fileName: asset.fileName!,
        fileSize: asset.fileSize!,
      };

      setSelectedImage(newImage);
      setError('');
    } catch (err) {
      const errorMsg = 'Não foi possível carregar a imagem';
      setError(errorMsg);
      showDialog?.({
        title: 'Erro',
        description: errorMsg,
        primaryButton: {
          label: 'OK',
          onPress: () => {},
        },
      });
    }
  }, [showDialog]);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    setError('');
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    selectedImage,
    error,
    pickImage,
    removeImage,
    clearError,
  };
}
