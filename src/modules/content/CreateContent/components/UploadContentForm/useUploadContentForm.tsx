import {useForm} from 'react-hook-form';
import {
  UploadContentSchema,
  uploadContentSchema,
} from './schema/uploadContentSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {UploadFile} from '../../../../../types/content';
import {useCallback, useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';
import useContentQueries from '../../../services/contentQueryFactory';
import {useAuth} from '../../../../../contexts/AuthContext';
import useDialogModal from '../../../../../hooks/useDialogModal';

const useUploadContentForm = () => {
  const navigation = useNavigation<NavigationStackProp>();
  const {user} = useAuth();
  const queries = useContentQueries(['content']);
  const createContentWithFilesMutation = queries.createContentWithFiles();

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
  const {DialogPortal, showDialog} = useDialogModal();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = queries.getCategories();

  const title = watch('title');
  const description = watch('description');

  const selectedCategories = watch('categories');

  const filteredCategories = useMemo(() => {
    const userRole = user?.role?.toUpperCase();
    const isUser = !userRole || userRole === 'USER';

    if (isUser) {
      return categories.filter(category => !category.auditable);
    }

    return categories;
  }, [categories, user?.role]);

  const categoriesList = useCallback(() => {
    return filteredCategories.map(c => ({
      content: c.name,
      categoryId: c.id,
      isActive: selectedCategories.includes(c.id),
    }));
  }, [filteredCategories, selectedCategories]);

  const onSubmit = async (data: UploadContentSchema) => {
    try {
      setIsLoading(true);
      setUploadError('');

      if (filesList.length === 0) {
        const errorMsg = 'Adicione pelo menos 1 imagem ou vídeo';
        setUploadError(errorMsg);
        showDialog({
          title: 'Erro',
          description: errorMsg,
          primaryButton: {
            label: 'OK',
            onPress: () => {},
          },
        });
        setIsLoading(false);
        return;
      }

      const userId = user?.id ? String(user.id) : '';
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      await createContentWithFilesMutation.mutateAsync({
        userId,
        contentData: {
          title: data.title,
          description: data.description,
          subtitle: data.subtitle || undefined,
          subcontent: data.subcontent || undefined,
          categories: data.categories,
          files: filesList,
        },
      });

      showDialog({
        title: 'Sucesso!',
        description: 'Seu conteúdo foi publicado com sucesso.',
        primaryButton: {
          label: 'OK',
          onPress: () => {
            reset();
            navigation.navigate('MainTabs', {screen: 'Contents'});
          },
        },
        dismissOnBackdropPress: false,
      });
    } catch (error) {
      console.error('Error creating content:', error);
      showDialog({
        title: 'Erro',
        description: 'Não foi possível publicar seu conteúdo. Tente novamente.',
        primaryButton: {
          label: 'OK',
          onPress: () => {},
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectCategory = (categoryId: number) => {
    const currentCategories = watch('categories');
    const isAlreadySelected = currentCategories.includes(categoryId);

    if (isAlreadySelected) {
      setValue(
        'categories',
        currentCategories.filter(c => c !== categoryId),
      );
    } else {
      setValue('categories', [...currentCategories, categoryId]);
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
    DialogPortal,
  };
};

export default useUploadContentForm;
