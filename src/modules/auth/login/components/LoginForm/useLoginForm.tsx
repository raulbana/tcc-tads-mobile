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

  const {login: authLogin, setSession} = useAuth();

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        const res = await loginMutate({
          email: data.email,
          password: data.password,
        });

        const apiUser = res?.user;
        const apiToken = res?.token;

        if (apiUser) {
          if (setSession) {
            await setSession({user: apiUser, token: apiToken});
          } else {
            await authLogin(apiUser);
          }
        } else {
          if (res) {
            if (setSession) {
              await setSession({user: res.user, token: res.token});
            } else {
              await authLogin(res.user);
            }
          }
        }
      } catch (err) {
        throw err;
      }
    },
    [loginMutate, authLogin, setSession],
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
  };
};

export default useLoginForm;
