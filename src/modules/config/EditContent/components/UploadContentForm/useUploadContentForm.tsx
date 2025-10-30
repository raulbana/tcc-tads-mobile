import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback, useState, useEffect, useMemo} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {Content, ContentCategory} from '../../../../../types/content';
import {
  uploadContentSchema,
  UploadContentSchema,
} from './schema/uploadContentSchema';
import {UploadFile} from './UploadBox/useUpload';
import useContentQueries from '../../../../content/services/contentQueryFactory';
import { useAuth } from '../../../../../contexts/AuthContext';

const useUploadContentForm = (initialContent?: Content | null) => {
  const navigation = useNavigation<NavigationStackProp>();
  const theme = useDynamicTheme();
  const { user } = useAuth();
  
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    watch,
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
  const {data: categoriesData = [], isLoading: isLoadingCategories} =
    contentQueries.getCategories();

  const { mutateAsync: updateContent } = contentQueries.updateContent();

  const categoriesList = useMemo(() => {
    return categoriesData.map((category: ContentCategory) => ({
      id: category.id,
      content: category.name,
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    }));
  }, [categoriesData, theme.colors]);

  useEffect(() => {
    if (initialContent) {
      setValue('title', initialContent.title);
      setValue('description', initialContent.description || '');
      setValue('subtitle', initialContent.subtitle || '');
      setValue('subcontent', initialContent.subcontent || '');
      if (initialContent.media && initialContent.media.length > 0) {
        const imageFiles: UploadFile[] = initialContent.media.filter(media => media.contentType.startsWith('image/')).map(media => ({
          id: media.url,
          uri: media.url,
          type: media.contentType,
          fileName: media.altText,
          fileSize: media.contentSize,
        })); 
        setFilesList(prev => [...prev, ...imageFiles]);
        setValue('images', imageFiles.map(f => f.uri));
      }
      if (initialContent.media.find(media => media.contentType.startsWith('video/'))) {
        const videoFile: UploadFile = {
          id: 'video-0',
          uri: initialContent.media.find(media => media.contentType.startsWith('video/'))?.url || '',
          type: initialContent.media.find(media => media.contentType.startsWith('video/'))?.contentType || '',
          fileName: initialContent.media.find(media => media.contentType.startsWith('video/'))?.altText || '',
          fileSize: initialContent.media.find(media => media.contentType.startsWith('video/'))?.contentSize || 0,
        };
        setFilesList(prev => [...prev, videoFile]);
        setValue('video', videoFile.uri);
      }
      if (initialContent.categories && initialContent.categories.length > 0) {
        const categoryArray = initialContent.categories;
        setValue('categories', categoryArray);
      }
    }
  }, [initialContent, setValue]);

  useEffect(() => {
    if (initialContent?.categories && initialContent.categories.length > 0) {
      const currentCategories = watch('categories') || [];
      if (!currentCategories.includes(initialContent.categories[0])) {
        setValue('categories', [initialContent.categories[0]]);
      }
    }
  }, [initialContent, setValue, watch]);

  const handleRemoveFile = useCallback(
    (file: UploadFile) => {
      setFilesList(prev => {
        const updatedList = prev.filter(f => f.id !== file.id);
        const images = updatedList
          .filter(f => f.type.startsWith('image'))
          .map(f => f.uri);
        setValue('images', images);

        const videoFile = updatedList.find(f => f.type.startsWith('video'));
        setValue('video', videoFile?.uri || '');

        return updatedList;
      });
    },
    [setValue],
  );

  const handleUpdateFiles = useCallback(
    (files: UploadFile[]) => {
      setFilesList(files);
      const images = files
        .filter(f => f.type.startsWith('image'))
        .map(f => f.uri);
      setValue('images', images);

      const videoFile = files.find(f => f.type.startsWith('video'));
      if (videoFile && videoFile.uri) {
        setValue('video', videoFile.uri);
      } else {
        setValue('video', '');
      }

      if (files.length > 0) {
        setUploadError('');
      }
    },
    [setValue],
  );

  const handleCategoryToggle = useCallback(
    (category: any) => {
      const currentCategories = watch('categories') || [];
      const categoryName = category.content;
      const isSelected = currentCategories.includes(categoryName);

      if (isSelected) {
        setValue(
          'categories',
          currentCategories.filter(cat => cat !== categoryName),
        );
      } else {
        setValue('categories', [...currentCategories, categoryName]);
      }
    },
    [setValue, watch],
  );

  const selectedCategories = watch('categories') || [];

  const categoriesListWithState = useMemo(() => {
    return categoriesList.map(cat => ({
      ...cat,
      backgroundColor: selectedCategories.includes(cat.content)
        ? theme.colors.purple_04
        : theme.colors.gray_03,
      textColor: selectedCategories.includes(cat.content)
        ? theme.colors.white
        : theme.colors.gray_08,
    }));
  }, [categoriesList, selectedCategories, theme.colors]);

  const handleSave = useCallback(
    async (data: UploadContentSchema) => {
      try {
        setIsLoading(true);
        setUploadError('');

        await updateContent({
          id: initialContent?.id || '',
          contentData: {
            title: data.title,
            description: data.description,
            subtitle: data.subtitle || '',
            subcontent: data.subcontent || '',
          },
            userId: user?.id.toString() || '', 
          });

        Alert.alert('Sucesso', 'Post atualizado com sucesso!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch (error) {
        setUploadError('Erro ao atualizar o post. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [navigation],
  );

  const handleCancel = useCallback(() => {
    Alert.alert(
      'Descartar Alterações',
      'Você tem certeza que deseja descartar as alterações?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  }, [navigation]);

  return {
    control,
    handleSubmit,
    formState: {errors, isValid},
    filesList,
    categoriesList: categoriesListWithState,
    isLoading: isLoading || isLoadingCategories,
    uploadError,
    handleSave,
    handleCancel,
    handleRemoveFile,
    handleUpdateFiles,
    handleCategoryToggle,
    title: watch('title') || '',
    description: watch('description') || '',
  };
};

export default useUploadContentForm;
