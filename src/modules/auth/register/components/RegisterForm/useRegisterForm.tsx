import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import useAuthQueries from '../../../services/authQueryFactory';
import {useAuth} from '../../../../../contexts/AuthContext';
import {registerSchema, RegisterFormData} from '../../schema/registerSchema';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../../navigation/routes';

const useRegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    watch,
    reset,
    register,
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
  });

  const {useRegister} = useAuthQueries(['auth']);

  const {navigate} = useNavigation<NavigationStackProp>();

  const registerMutation = useRegister();
  const {mutateAsync: registerMutate, isPending: isRegistering} =
    registerMutation;

  const {register: authRegister, isLoading: authLoading} = useAuth();

  const onSubmit = useCallback(
    async (values: RegisterFormData) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        await authRegister(payload);
        navigate('MainTabs');

        reset();
      } catch (error) {
        throw error;
      }
    },
    [authRegister, navigate, reset],
  );

  return {
    control,
    handleSubmit,
    isValid,
    errors,
    setValue,
    watch,
    onSubmit,
    isRegistering,
    register,
    isLoading: authLoading,
  };
};

export default useRegisterForm;
