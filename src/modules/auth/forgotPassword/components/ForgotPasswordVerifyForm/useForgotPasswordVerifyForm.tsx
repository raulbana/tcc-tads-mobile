import {useCallback} from 'react';
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

const useForgotPasswordVerifyForm = (onSuccess: () => void) => {
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
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const {useForgotPasswordReset} = useAuthQueries(['auth']);

  const {navigate} = useNavigation<NavigationStackProp>();

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
          email: values.email,
          otp: values.otp,
          newPassword: values.newPassword,
        };

        const res = await forgotPasswordValidateMutate(payload);

        if (res.status === 'success') {
          navigateToLogin();
        } else {
          throw new Error('Forgot password request failed');
        }

        reset();
        return res;
      } catch (error) {
        throw error;
      }
    },
    [forgotPasswordValidateMutate, reset],
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
  };
};

export default useForgotPasswordVerifyForm;
