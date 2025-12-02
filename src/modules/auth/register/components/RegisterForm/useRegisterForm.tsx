import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from '../../../../../contexts/AuthContext';
import {registerSchema, RegisterFormData} from '../../schema/registerSchema';

const useRegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid, errors},
    setValue,
    setError,
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

  const {
    register: authRegister,
    isLoading: authLoading,
    hasOnboardingData,
    setPendingRegister,
  } = useAuth();

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

        reset();
      } catch (error: any) {
        const message =
          error?.message && typeof error.message === 'string'
            ? error.message
            : 'Erro ao realizar cadastro. Tente novamente.';

        setError('email', {
          type: 'manual',
          message,
        });
      }
    },
    [authRegister, reset, hasOnboardingData, setPendingRegister, setError],
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
  };
};

export default useRegisterForm;
