import {useCallback, useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import useAuthQueries from '../../../services/authQueryFactory';
import {useAuth} from '../../../../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';
import {forgotPasswordValidateRequest} from '../../../../../types/auth';
import {
  ForgotPasswordValidationFormData,
  forgotPasswordValidationSchema,
} from '../schema/forgotPassword';

const useForgotPasswordVerifyForm = (
  email: string,
  onSuccess: () => void,
) => {
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
  } = useForm<ForgotPasswordValidationFormData>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: email,
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  // Atualizar o email quando ele mudar
  useEffect(() => {
    setValue('email', email);
  }, [email, setValue]);

  const {useForgotPasswordReset} = useAuthQueries(['auth']);

  const {navigate} = useNavigation<NavigationStackProp>();

  const showToast = useCallback((message: string, type: 'SUCCESS' | 'ERROR') => {
    setToastMessage(message);
    setToastType(type);
    setIsToastOpen(true);
  }, []);

  const closeToast = useCallback(() => {
    setIsToastOpen(false);
    setToastMessage(null);
  }, []);

  const onBackCleanup = () => {
    reset();
  };

  const navigateToLogin = () => {
    navigate('Auth', {screen: 'Login'});
  };

  const forgotPasswordRequestMutation = useForgotPasswordReset();
  const {
    mutateAsync: forgotPasswordValidateMutate,
    isPending: isForgotPasswordValidating,
  } = forgotPasswordRequestMutation;

  const {} = useAuth();

  const onSubmit = useCallback(
    async (values: ForgotPasswordValidationFormData) => {
      try {
        const payload: forgotPasswordValidateRequest = {
          email: email,
          otp: values.otp,
          newPassword: values.newPassword,
        };

        const res = await forgotPasswordValidateMutate(payload);

        if (res && res.status === 'success') {
          reset();
          showToast('Senha redefinida com sucesso!', 'SUCCESS');
          // Aguardar um pouco para mostrar o toast antes de redirecionar
          setTimeout(() => {
            onSuccess();
          }, 1500);
        } else {
          const errorMessage =
            res?.message || 'Falha ao redefinir senha. Tente novamente.';
          showToast(errorMessage, 'ERROR');
        }

        return res;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Erro ao redefinir senha. Verifique os dados e tente novamente.';
        showToast(errorMessage, 'ERROR');
        throw error;
      }
    },
    [forgotPasswordValidateMutate, reset, onSuccess, email, showToast],
  );

  return {
    control,
    handleSubmit,
    isValid,
    errors,
    setValue,
    watch,
    onSubmit,
    isForgotPasswordValidating,
    register,
    navigateToLogin,
    onBackCleanup,
    isLoading: isForgotPasswordValidating,
    toastMessage,
    toastType,
    isToastOpen,
    closeToast,
  };
};

export default useForgotPasswordVerifyForm;
