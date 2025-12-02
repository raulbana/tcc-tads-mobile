import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import useAuthQueries from '../../../services/authQueryFactory';
import {useAuth} from '../../../../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';
import {forgotPasswordRequestRequest} from '../../../../../types/auth';
import {
  ForgotPasswordRequestFormData,
  forgotPasswordRequestSchema,
} from '../schema/forgotPassword';

const useRegisterForm = (onSuccess: (email: string) => void) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'SUCCESS' | 'ERROR'>('ERROR');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    watch,
    reset,
    register,
  } = useForm<ForgotPasswordRequestFormData>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  const {useForgotPasswordRequest} = useAuthQueries(['auth']);
  const {navigate} = useNavigation<NavigationStackProp>();

  const forgotPasswordRequestMutation = useForgotPasswordRequest();
  const {
    mutateAsync: forgotPasswordRequestMutate,
    isPending: isForgotPasswordRequesting,
  } = forgotPasswordRequestMutation;

  const {} = useAuth();

  const navigateToLogin = () => {
    navigate('Auth', {screen: 'Login'});
  };

  const showToast = useCallback((message: string, type: 'SUCCESS' | 'ERROR') => {
    setToastMessage(message);
    setToastType(type);
    setIsToastOpen(true);
  }, []);

  const closeToast = useCallback(() => {
    setIsToastOpen(false);
    setToastMessage(null);
  }, []);

  const onSubmit = useCallback(
    async (values: ForgotPasswordRequestFormData) => {
      try {
        const payload: forgotPasswordRequestRequest = {
          email: values.email,
        };

        const res = await forgotPasswordRequestMutate(payload);

        if (res && res.status === 'success') {
          onSuccess(values.email);
          reset();
          showToast('Código de verificação enviado para seu e-mail', 'SUCCESS');
        } else {
          const errorMessage =
            res?.message || 'Falha ao solicitar redefinição de senha. Tente novamente.';
          showToast(errorMessage, 'ERROR');
        }

        return res;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Erro ao solicitar redefinição de senha. Verifique o e-mail e tente novamente.';
        showToast(errorMessage, 'ERROR');
        throw error;
      }
    },
    [forgotPasswordRequestMutate, reset, onSuccess, showToast],
  );

  return {
    control,
    handleSubmit,
    isValid,
    errors,
    setValue,
    watch,
    onSubmit,
    isForgotPasswordRequesting,
    register,
    navigateToLogin,
    isLoading: isForgotPasswordRequesting,
    toastMessage,
    toastType,
    isToastOpen,
    closeToast,
  };
};

export default useRegisterForm;
