import {useForm} from 'react-hook-form';
import {
  UploadContentSchema,
  uploadContentSchema,
} from './schema/uploadContentSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {UploadFile} from '../UploadBox/useUpload';
import {useCallback, useState} from 'react';

const useUploadContentForm = () => {
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

  const title = watch('title');
  const description = watch('description');

  const onSubmit = (data: UploadContentSchema) => {
    console.log(data);
  };

  const onSelectCategory = (category: string) => {
    setValue('categories', [...watch('categories'), category]);
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
    title,
    description,
  };
};

export default useUploadContentForm;
