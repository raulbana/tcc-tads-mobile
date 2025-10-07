import {useState} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export type UploadFile = {
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
};

export function useUpload(
  allowedTypes: ('image' | 'video')[] = ['image', 'video'],
) {
  const [files, setFiles] = useState<UploadFile[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number >()

  const pickFile = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: allowedTypes.includes('video') ? 'mixed' : 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) return;

      const asset = result.assets?.[0];
      if (!asset) return;

      setFiles([
        ...(files ?? []),
        {
          uri: asset.uri!,
          type: asset.type!,
          fileName: asset.fileName!,
          fileSize: asset.fileSize!,
        },
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar o arquivo.');
    }
  };

  const removeFile = (index: number) => {
    if (!files) return;
    setFiles(files.filter((_, i) => i !== index));
  };

   const reorderFiles = (ordered: UploadFile[]) => {
    setFiles(ordered);
  };

  return {files, pickFile, removeFile, reorderFiles};
}
