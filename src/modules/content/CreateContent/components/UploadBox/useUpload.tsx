import {useState, useRef, useCallback} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {DialogOptions} from '../../../../../hooks/useDialogModal';

export type UploadFile = {
  id: string;
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
};

interface UseUploadOptions {
  showDialog?: (options: DialogOptions) => void;
}

export function useUpload(
  allowedTypes: ('image' | 'video')[] = ['image', 'video'],
  options?: UseUploadOptions,
) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string>('');
  const [totalFileSize, setTotalFileSize] = useState<number>(0);
  const listRef = useRef<any>(null);
  const showDialog = options?.showDialog;

  const pickFile = useCallback(async () => {
    try {
      setError('');

      const result = await launchImageLibrary({
        mediaType: allowedTypes.includes('video') ? 'mixed' : 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) return;

      const asset = result.assets?.[0];
      if (!asset) return;

      const MAX_FILE_SIZE = 50 * 1024 * 1024;
      const MAX_TOTAL_SIZE = 500 * 1024 * 1024;
      
      if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
        const fileSizeMB = (asset.fileSize / 1024 / 1024).toFixed(2);
        const errorMsg = `Limite excedido (${fileSizeMB}MB). Máximo: 50MB`;
        setError(errorMsg);
        showDialog?.({
          title: 'Arquivo muito grande',
          description: errorMsg,
          primaryButton: {
            label: 'Entendi',
            onPress: () => {},
          },
        });
        return;
      }

      if (asset.fileSize && asset.fileSize + totalFileSize > MAX_TOTAL_SIZE) {
        const totalFileSizeMB = (totalFileSize / 1024 / 1024).toFixed(2);
        const fileSizeMB = (asset.fileSize / 1024 / 1024).toFixed(2);
        const errorMsg = `Limite excedido (${fileSizeMB}MB). Máximo: 500MB total (${totalFileSizeMB}MB)`;
        setError(errorMsg);
        showDialog?.({
          title: 'Arquivo muito grande',
          description: errorMsg,
          primaryButton: {
            label: 'Entendi',
            onPress: () => {},
          },
        });
        return;
      }

      const isVideo = asset.type?.startsWith('video');

      if (isVideo) {
        const hasVideo = files.some(file => file.type.startsWith('video'));
        if (hasVideo) {
          const errorMsg = 'Apenas 1 vídeo é permitido por post';
          setError(errorMsg);
          showDialog?.({
            title: 'Limite de vídeos atingido',
            description: errorMsg,
            primaryButton: {
              label: 'Entendi',
              onPress: () => {},
            },
          });
          return;
        }
      }

      const newFile: UploadFile = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        uri: asset.uri!,
        type: asset.type!,
        fileName: asset.fileName!,
        fileSize: asset.fileSize!,
      };

      if (isVideo) {
        setFiles(prevFiles => [...prevFiles, newFile]);
      } else {
        setFiles(prevFiles => [newFile, ...prevFiles]);
      }
      setTotalFileSize(
        prevTotalFileSize => prevTotalFileSize + asset.fileSize!,
      );
      setError('');
    } catch (err) {
      const errorMsg = 'Não foi possível carregar o arquivo';
      setError(errorMsg);
      showDialog?.({
        title: 'Erro',
        description: errorMsg,
        primaryButton: {
          label: 'Ok',
          onPress: () => {},
        },
      });
    }
  }, [allowedTypes, files, showDialog, totalFileSize]);

  const removeFile = useCallback((id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    setError('');
  }, []);

  const reorderFiles = useCallback((ordered: UploadFile[]) => {
    setFiles(ordered);
  }, []);

  return {files, pickFile, removeFile, reorderFiles, listRef, error, setError};
}
