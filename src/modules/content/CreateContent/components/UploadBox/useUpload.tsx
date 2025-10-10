import {useState, useRef, useCallback} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export type UploadFile = {
  id: string;
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
};

export function useUpload(
  allowedTypes: ('image' | 'video')[] = ['image', 'video'],
) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const listRef = useRef<any>(null);

  const pickFile = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: allowedTypes.includes('video') ? 'mixed' : 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) return;

      const asset = result.assets?.[0];
      if (!asset) return;

      const newFile: UploadFile = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        uri: asset.uri!,
        type: asset.type!,
        fileName: asset.fileName!,
        fileSize: asset.fileSize!,
      };

      setFiles(prevFiles => [...prevFiles, newFile]);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar o arquivo.');
    }
  }, [allowedTypes]);

  const removeFile = useCallback((id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  }, []);

  const reorderFiles = useCallback((ordered: UploadFile[]) => {
    setFiles(ordered);
  }, []);

  return {files, pickFile, removeFile, reorderFiles, listRef};
}
