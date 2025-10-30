import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {TalkToUsFormData, talkToUsSchema} from '../../schema/talkToUsSchema';
import {useAuth} from '../../../../../contexts/AuthContext';
import useConfigQueries from '../../../services/configQueryFactory';
import {ContactRequest} from '../../../../../types/config';
import {useState} from 'react';

const useTalkToUsForm = () => {
  const {user} = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const configQueries = useConfigQueries(['config']);
  const sendContactEmailMutation = configQueries.useSendContactEmail();

  const {
    register,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    control,
    watch,
    reset,
  } = useForm<TalkToUsFormData>({
    resolver: zodResolver(talkToUsSchema),
    defaultValues: {
      subject: '',
      message: '',
      email: user?.email || '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: TalkToUsFormData) => {
    try {
      setIsSuccess(false);

      const contactRequest: ContactRequest = {
        userEmail: data.email,
        subject: data.subject,
        text: data.message,
      };

      await sendContactEmailMutation.mutateAsync(contactRequest);

      setIsSuccess(true);
      reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  };

  return {
    isValid,
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    watch,
    control,
    isLoading: sendContactEmailMutation.isPending,
    isSuccess,
  };
};

export default useTalkToUsForm;
