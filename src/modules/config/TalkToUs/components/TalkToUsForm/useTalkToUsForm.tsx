import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {TalkToUsFormData, talkToUsSchema} from '../../schema/talkToUsSchema';
import {useAuth} from '../../../../../contexts/AuthContext';
import configServices from '../../../services/configServices';
import {ContactRequest} from '../../../../../types/config';
import {useState} from 'react';

const useTalkToUsForm = () => {
  const {user} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsLoading(true);
      setIsSuccess(false);

      const contactRequest: ContactRequest = {
        userEmail: data.email,
        subject: data.subject,
        text: data.message,
      };

      await configServices.sendContactEmail(contactRequest);

      setIsSuccess(true);
      reset();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    } finally {
      setIsLoading(false);
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
    isLoading,
    isSuccess,
  };
};

export default useTalkToUsForm;
