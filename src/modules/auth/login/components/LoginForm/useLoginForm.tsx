import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useCallback} from 'react';
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
        throw err;
      }
    },
    [authLogin],
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
