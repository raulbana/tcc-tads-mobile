import {useCallback} from 'react';
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

const useRegisterForm = (onSuccess: () => void) => {
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

  const onSubmit = useCallback(
    async (values: ForgotPasswordRequestFormData) => {
      onSuccess();
      try {
        const payload: forgotPasswordRequestRequest = {
          email: values.email,
        };

        const res = await forgotPasswordRequestMutate(payload);

        if (res.status === 'success') {
          onSuccess();
        } else {
          throw new Error('Forgot password request failed');
        }

        reset();
        return res;
      } catch (error) {
        throw error;
      }
    },
    [forgotPasswordRequestMutate, reset, onSuccess],
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
  };
};

export default useRegisterForm;
