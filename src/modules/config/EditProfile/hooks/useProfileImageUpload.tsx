import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export type ProfileImageFile = {
  id: string;
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
};

export function useProfileImageUpload() {
  const [selectedImage, setSelectedImage] = useState<ProfileImageFile | null>(
    null,
  );
  const [error, setError] = useState<string>('');

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
        Alert.alert('Imagem muito grande', errorMsg);
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (asset.type && !allowedTypes.includes(asset.type)) {
        const errorMsg = 'Formato não suportado. Use JPG ou PNG';
        setError(errorMsg);
        Alert.alert('Formato inválido', errorMsg);
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
      Alert.alert('Erro', errorMsg);
    }
  }, []);

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
