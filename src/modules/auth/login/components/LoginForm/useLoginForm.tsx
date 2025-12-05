import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useCallback} from 'react';
import {AxiosError} from 'axios';
import {LoginFormData, loginSchema} from '../../schema/loginSchema';
import useAuthQueries from '../../../services/authQueryFactory';
import {useAuth} from '../../../../../contexts/AuthContext';

const useLoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    setError,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    mode: 'onSubmit',
  });

  const remember = watch('remember');

  const {useLogin} = useAuthQueries(['auth']);
  const loginMutation = useLogin();
  const {mutateAsync: loginMutate, isPending: isLogging} = loginMutation;

  const {login: authLogin, isLoading: authLoading} = useAuth();

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await authLogin({
          email: data.email,
          password: data.password,
          remember: data.remember,
        });
      } catch (err) {
        let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';

        if (err instanceof AxiosError) {
          const status = err.response?.status;
          const apiMessage = err.response?.data?.message;

          if (status === 401) {
            errorMessage = 'Email ou senha inválidos. Tente novamente.';
          } else if (status === 429) {
            errorMessage =
              'Muitas tentativas. Aguarde alguns instantes e tente novamente.';
          } else if (status === 403) {
            errorMessage = 'Acesso negado. Verifique suas credenciais.';
          } else if (status === 500) {
            errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          } else if (apiMessage) {
            errorMessage = apiMessage;
          } else if (err.message) {
            errorMessage = err.message;
          }
        } else if (err instanceof Error && err.message) {
          errorMessage = err.message;
        }

        setError('email', {
          type: 'manual',
          message: errorMessage,
        });

        setError('password', {
          type: 'manual',
          message: errorMessage,
        });
      }
    },
    [authLogin, setError],
  );

  return {
    isValid,
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    remember,
    watch,
    control,
    isLogging,
    isLoading: authLoading,
  };
};

export default useLoginForm;
