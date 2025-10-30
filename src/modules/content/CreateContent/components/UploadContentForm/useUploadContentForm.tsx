import {useForm} from 'react-hook-form';
import {
  UploadContentSchema,
  uploadContentSchema,
} from './schema/uploadContentSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {UploadFile} from '../UploadBox/useUpload';
import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';
import useContentQueries from '../../../services/contentQueryFactory';
import {useAuth} from '../../../../../contexts/AuthContext';

const useUploadContentForm = () => {
  const navigation = useNavigation<NavigationStackProp>();
  const {user} = useAuth();
  const queries = useContentQueries(['content']);
  const uploadMediaMutation = queries.uploadMedia();
  const createContentMutation = queries.createContent();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
    reset,
    register,
  } = useForm<UploadContentSchema>({
    resolver: zodResolver(uploadContentSchema),
    defaultValues: {
      title: '',
      description: '',
      images: [],
      video: '',
      categories: [],
      subtitle: '',
      subcontent: '',
    },
  });

  const [filesList, setFilesList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const contentQueries = useContentQueries(['content']);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = contentQueries.getCategories();

  const title = watch('title');
  const description = watch('description');

  const selectedCategories = watch('categories');

  const categoriesList = useCallback(() => {
    return categories.map(c => ({
      content: c.name,
      isActive: selectedCategories.includes(c.name),
    }));
  }, [categories, selectedCategories]);

  const onSubmit = async (data: UploadContentSchema) => {
    try {
      setIsLoading(true);
      setUploadError('');

      if (filesList.length === 0) {
        const errorMsg = 'Adicione pelo menos 1 imagem ou vídeo';
        setUploadError(errorMsg);
        Alert.alert('Erro', errorMsg);
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      filesList.forEach((file, index) => {
        formData.append('files', {
          uri: file.uri,
          name: file.fileName || `upload_${index}`,
          type: file.type.startsWith('video') ? 'video/mp4' : 'image/jpeg',
        });
      });

      const uploadRes: any = await uploadMediaMutation.mutateAsync(formData);

      const uploadedMedia: any[] = Array.isArray(uploadRes?.media)
        ? uploadRes.media
        : Array.isArray(uploadRes)
        ? uploadRes
        : [];

      const uploadedImageUrls = uploadedMedia
        .filter(m => (m.contentType || m.type || '').startsWith('image'))
        .map(m => m.url)
        .filter(Boolean);

      const uploadedVideoUrl = (
        uploadedMedia.find(m =>
          (m.contentType || m.type || '').startsWith('video'),
        ) || {}
      ).url;

      const userId = user?.id ? String(user.id) : '';
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      await createContentMutation.mutateAsync({
        userId,
        contentData: {
          title: data.title,
          description: data.description,
          subtitle: data.subtitle || undefined,
          subcontent: data.subcontent || undefined,
          categories: data.categories,
          images: uploadedImageUrls.length ? uploadedImageUrls : data.images,
          video: uploadedVideoUrl || data.video || undefined,
        },
      });

      Alert.alert('Sucesso!', 'Seu conteúdo foi publicado com sucesso.', [
        {
          text: 'OK',
          onPress: () => {
            reset();
            navigation.navigate('MainTabs', {screen: 'Contents'});
          },
        },
      ]);
    } catch (error) {
      console.error('Error creating content:', error);
      Alert.alert(
        'Erro',
        'Não foi possível publicar seu conteúdo. Tente novamente.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectCategory = (category: string) => {
    const currentCategories = watch('categories');
    const isAlreadySelected = currentCategories.includes(category);

    if (isAlreadySelected) {
      setValue(
        'categories',
        currentCategories.filter(c => c !== category),
      );
    } else {
      setValue('categories', [...currentCategories, category]);
    }
  };

  const onSubmitFiles = (files: UploadFile[]) => {
    setFilesList(files);
    setValue(
      'images',
      files.map(file => file.uri),
    );
    const videoFile = files.find(file => file.type.startsWith('video'));
    if (videoFile && videoFile.uri) {
      setValue('video', videoFile.uri);
    } else {
      setValue('video', '');
    }
  };

  const onRemoveFile = (file: UploadFile) => {
    setFilesList(filesList.filter(f => f.id !== file.id));
    setValue(
      'images',
      filesList.filter(f => f.id !== file.id).map(file => file.uri),
    );
    if (file.type.startsWith('video')) {
      setValue('video', '');
    }
  };

  const onUpdateFiles = useCallback(
    (files: UploadFile[]) => {
      setFilesList(files);
      setValue(
        'images',
        files.map(file => file.uri),
      );
      const videoFile = files.find(file => file.type.startsWith('video'));
      if (videoFile && videoFile.uri) {
        setValue('video', videoFile.uri);
      } else {
        setValue('video', '');
      }

      if (files.length > 0) {
        setUploadError('');
      }
    },
    [filesList, setFilesList, setValue],
  );

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    watch,
    reset,
    register,
    onSelectCategory,
    onSubmitFiles,
    onRemoveFile,
    onUpdateFiles,
    filesList,
    titleText: title,
    descriptionText: description,
    categoriesList: categoriesList(),
    isLoading,
    uploadError,
  };
};

export default useUploadContentForm;
