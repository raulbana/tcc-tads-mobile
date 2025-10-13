import {useForm} from 'react-hook-form';
import {
  UploadContentSchema,
  uploadContentSchema,
} from './schema/uploadContentSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {UploadFile} from '../UploadBox/useUpload';
import {useCallback, useState} from 'react';
import theme from '../../../../../theme/theme';
import contentServices from '../../../services/contentServices';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';

const useUploadContentForm = () => {
  const navigation = useNavigation<NavigationStackProp>();

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
    },
  });

  const [filesList, setFilesList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [categoriesList, setCategoriesList] = useState<any[]>([
    {
      content: 'Categoria',
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    },
    {
      content: 'Categoria 2',
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    },
    {
      content: 'Categoria 3',
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    },
    {
      content: 'Categoria 4',
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    },
    {
      content: 'Categoria 5',
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    },
  ]);

  const title = watch('title');
  const description = watch('description');

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

      /*const response = await contentServices.createContent({
        title: data.title,
        description: data.description,
        images: data.images,
        video: data.video,
        categories: data.categories,
      });*/

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

    setCategoriesList(
      categoriesList.map(c =>
        c.content === category ? {...c, isActive: !c.isActive} : c,
      ),
    );

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

      // Clear upload error when files are added
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
    categoriesList,
    isLoading,
    uploadError,
  };
};

export default useUploadContentForm;
