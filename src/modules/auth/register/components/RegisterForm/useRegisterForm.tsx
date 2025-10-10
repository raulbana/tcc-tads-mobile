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

  const {setSession} = useAuth();

  const onSubmit = useCallback(
    async (values: RegisterFormData) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        const res = await registerMutate(payload);

        if (res.status === 'success') {
          navigate('Auth', {screen: 'Login'});
        } else {
          throw new Error('Registration failed');
        }

        reset();
        return res;
      } catch (error) {
        throw error;
      }
    },
    [registerMutate, setSession, reset],
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
  };
};

export default useRegisterForm;
