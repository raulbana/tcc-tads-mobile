import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {TalkToUsFormData, talkToUsSchema} from '../../schema/talkToUsSchema';

const useTalkToUsForm = () => {
  const {
    register,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    control,
    watch,
  } = useForm<TalkToUsFormData>({
    resolver: zodResolver(talkToUsSchema),
    defaultValues: {
      subject: '',
      message: '',
      email: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = () => {};

  return {
    isValid,
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    watch,
    control,
  };
};

export default useTalkToUsForm;
