import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {useAuth} from '../../../../../contexts/AuthContext';
import {registerSchema, RegisterFormData} from '../../schema/registerSchema';
import {NavigationStackProp} from '../../../../../navigation/routes';

const useRegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid, errors, isSubmitted},
    setValue,
    setError,
    watch,
    register,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    register: authRegister,
    login: authLogin,
    isLoading: authLoading,
    hasOnboardingData,
    setPendingRegister,
  } = useAuth();
  const {navigate} = useNavigation<NavigationStackProp>();

  const onSubmit = useCallback(
    async (values: RegisterFormData) => {
      if (!hasOnboardingData()) {
        setPendingRegister(true);
        return;
      }

      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        await authRegister(payload);

        // Após registro bem-sucedido, fazer login automático
        try {
          await authLogin({
            email: values.email,
            password: values.password,
            remember: false,
          });
          // Navegar para a tela inicial após login bem-sucedido
          navigate('MainTabs');
        } catch (loginError) {
          // Se o login automático falhar, navegar para a tela de login
          navigate('Auth', {screen: 'Login'});
        }
      } catch (error: any) {
        let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';

        if (error instanceof AxiosError) {
          const status = error.response?.status;
          const apiMessage = error.response?.data?.message;

          if (status === 400) {
            errorMessage =
              apiMessage ||
              'Dados inválidos. Verifique as informações e tente novamente.';
          } else if (status === 409) {
            errorMessage =
              apiMessage ||
              'Este e-mail já está cadastrado. Tente fazer login.';
          } else if (status === 429) {
            errorMessage =
              'Muitas tentativas. Aguarde alguns instantes e tente novamente.';
          } else if (status === 500) {
            errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          } else if (apiMessage) {
            errorMessage = apiMessage;
          } else if (error.message) {
            errorMessage = error.message;
          }
        } else if (error instanceof Error && error.message) {
          errorMessage = error.message;
        }

        setError('email', {
          type: 'manual',
          message: errorMessage,
        });
      }
    },
    [
      authRegister,
      authLogin,
      navigate,
      hasOnboardingData,
      setPendingRegister,
      setError,
    ],
  );

  return {
    control,
    handleSubmit,
    isValid,
    errors,
    setValue,
    watch,
    onSubmit,
    register,
    isLoading: authLoading,
    isSubmitted,
    trigger,
  };
};

export default useRegisterForm;
