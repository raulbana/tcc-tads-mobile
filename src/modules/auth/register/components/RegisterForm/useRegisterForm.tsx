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
      // Verificar se tem dados de onboarding antes de processar o registro
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
        
        // Resetar formulário
        reset();
        
        // Redirecionamento será feito no AuthContext após limpar dados
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
