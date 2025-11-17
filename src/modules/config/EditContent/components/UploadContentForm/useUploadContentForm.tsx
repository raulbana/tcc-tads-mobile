import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback, useState, useEffect, useMemo, useRef} from 'react';
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
import {useAuth} from '../../../../../contexts/AuthContext';
import useDialogModal from '../../../../../hooks/useDialogModal';
import contentServices from '../../../../content/services/contentServices';

const useUploadContentForm = (initialContent?: Content | null) => {
  const navigation = useNavigation<NavigationStackProp>();
  const theme = useDynamicTheme();
  const {user} = useAuth();
  const {DialogPortal, showDialog} = useDialogModal();

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
  const [existingMedia, setExistingMedia] = useState<
    Array<{
      id?: number | null;
      url: string;
      contentType: string;
      contentSize: number;
      altText?: string | null;
    }>
  >([]);
  const [removedMediaIds, setRemovedMediaIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const contentQueries = useContentQueries(['content']);
  const {data: categoriesData = [], isLoading: isLoadingCategories} =
    contentQueries.getCategories();

  const {mutateAsync: updateContent} = contentQueries.updateContent();
  const {mutateAsync: uploadMedia} = contentQueries.uploadMedia();

  const filteredCategories = useMemo(() => {
    const userRole = user?.role?.toUpperCase();
    const isUser = !userRole || userRole === 'USER';

    if (isUser) {
      return categoriesData.filter(category => !category.auditable);
    }

    return categoriesData;
  }, [categoriesData, user?.role]);

  const categoriesList = useMemo(() => {
    return filteredCategories.map((category: ContentCategory) => ({
      id: category.id,
      content: category.name,
      textColor: theme.colors.gray_08,
      backgroundColor: theme.colors.gray_03,
    }));
  }, [filteredCategories, theme.colors]);

  const prevInitialContentIdRef = useRef<string>('');

  useEffect(() => {
    if (
      initialContent &&
      initialContent.id !== prevInitialContentIdRef.current
    ) {
      prevInitialContentIdRef.current = initialContent.id;
      setValue('title', initialContent.title);
      setValue('description', initialContent.description || '');
      setValue('subtitle', initialContent.subtitle || '');
      setValue('subcontent', initialContent.subcontent || '');

      const mediaArray = Array.isArray(initialContent.media)
        ? initialContent.media
        : [];
      setExistingMedia(mediaArray);
      setRemovedMediaIds([]);
      setFilesList([]);

      if (initialContent.categories && initialContent.categories.length > 0) {
        const categoryArray = initialContent.categories;
        setValue('categories', categoryArray);
      }
    }
  }, [initialContent?.id, setValue]);

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
      const isExistingMedia = existingMedia.some(m => m.url === file.uri);

      if (isExistingMedia) {
        const mediaToRemove = existingMedia.find(m => m.url === file.uri);
        if (mediaToRemove?.id) {
          setRemovedMediaIds(prev => [...prev, mediaToRemove.id!]);
          setExistingMedia(prev => prev.filter(m => m.id !== mediaToRemove.id));
        }
      } else {
        setFilesList(prev => {
          const updatedList = prev.filter(f => f.id !== file.id);
          return updatedList;
        });
      }
    },
    [existingMedia],
  );

  const handleUpdateFiles = useCallback(
    (files: UploadFile[]) => {
      const existingFiles = files.filter(file =>
        existingMedia.some(m => m.url === file.uri),
      );
      const newFiles = files.filter(
        file => !existingMedia.some(m => m.url === file.uri),
      );

      const reorderedExistingMedia = existingFiles
        .map(file => {
          const media = existingMedia.find(m => m.url === file.uri);
          return media;
        })
        .filter(
          (media): media is NonNullable<typeof media> => media !== undefined,
        );

      setExistingMedia(reorderedExistingMedia);
      setFilesList(newFiles);

      if (files.length > 0) {
        setUploadError('');
      }
    },
    [existingMedia],
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

        let uploadedMedia: Array<{
          url: string;
          contentType: string;
          contentSize: number;
          altText?: string;
        }> = [];

        const newFiles = filesList.filter(
          file => !existingMedia.some(m => m.url === file.uri),
        );

        if (newFiles.length > 0) {
          const formData = new FormData();
          newFiles.forEach((file, index) => {
            formData.append('files', {
              uri: file.uri,
              name: file.fileName || `upload_${index}`,
              type: file.type.startsWith('video') ? 'video/mp4' : 'image/jpeg',
            } as any);
          });

          const uploadRes: any = await uploadMedia(formData);

          uploadedMedia = Array.isArray(uploadRes?.media)
            ? uploadRes.media
            : Array.isArray(uploadRes)
            ? uploadRes
            : [];
        }

        const newMediaArray = uploadedMedia.map(m => ({
          url: m.url,
          contentType: m.contentType || 'image/jpeg',
          contentSize: m.contentSize || 0,
          altText: m.altText || data.title,
        }));

        const keptExistingMedia = existingMedia
          .filter(media => {
            if (media.id === null || media.id === undefined) return false;
            return !removedMediaIds.includes(media.id);
          })
          .map(media => ({
            id: media.id,
            url: media.url,
            contentType: media.contentType,
            contentSize: media.contentSize,
            altText: media.altText || data.title,
          }));

        const allMedia = [...keptExistingMedia, ...newMediaArray];

        const images = allMedia
          .filter(m => m.contentType?.startsWith('image/'))
          .map(m => m.url);
        const video =
          allMedia.find(m => m.contentType?.startsWith('video/'))?.url || '';

        await updateContent({
          id: initialContent?.id || '',
          contentData: {
            title: data.title,
            description: data.description,
            subtitle: data.subtitle || '',
            subcontent: data.subcontent || '',
            images: images,
            video: video,
          },
          userId: user?.id.toString() || '',
        });

        showDialog({
          title: 'Sucesso',
          description: 'Post atualizado com sucesso!',
          primaryButton: {
            label: 'OK',
            onPress: () => navigation.goBack(),
          },
          dismissOnBackdropPress: false,
        });
      } catch (error) {
        console.error('Erro ao atualizar o post:', error);
        setUploadError('Erro ao atualizar o post. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [
      navigation,
      filesList,
      existingMedia,
      removedMediaIds,
      initialContent,
      user,
      showDialog,
      updateContent,
      uploadMedia,
    ],
  );

  const handleCancel = useCallback(() => {
    showDialog({
      title: 'Descartar Alterações',
      description: 'Você tem certeza que deseja descartar as alterações?',
      secondaryButton: {
        label: 'Não',
        onPress: () => {},
      },
      primaryButton: {
        label: 'Sim',
        onPress: () => navigation.goBack(),
      },
    });
  }, [navigation, showDialog]);

  const allFilesList = useMemo(() => {
    const existingFiles: UploadFile[] = existingMedia.map(media => ({
      id: media.url,
      uri: media.url,
      type: media.contentType,
      fileName: media.altText || 'Mídia existente',
      fileSize: media.contentSize,
    }));
    return [...existingFiles, ...filesList];
  }, [existingMedia, filesList]);

  return {
    control,
    handleSubmit,
    formState: {errors, isValid},
    filesList: allFilesList,
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
    DialogPortal,
  };
};

export default useUploadContentForm;
