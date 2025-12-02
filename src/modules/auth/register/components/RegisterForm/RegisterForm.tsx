import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {Controller} from 'react-hook-form';
import * as S from './styles';
import useRegisterForm from './useRegisterForm';
import Input from '../../../../../components/Input/Input';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import SwitchToggle from '../../../../../components/SwitchToggle/SwitchToggle';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    onSubmit,
    watch,
    isLoading,
  } = useRegisterForm();

  const terms = watch('acceptTerms');

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <Controller
        control={control}
        name="name"
        render={({field}) => (
          <Input
            {...register('name')}
            label="Nome"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite seu nome"
            error={errors.name?.message as string | undefined}
            autoCapitalize="words"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              requestAnimationFrame(() => {
                emailInputRef.current?.focus();
              });
            }}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({field}) => (
          <Input
            ref={emailInputRef}
            {...register('email')}
            label="E-mail"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite seu e-mail"
            error={errors.email?.message as string | undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              requestAnimationFrame(() => {
                passwordInputRef.current?.focus();
              });
            }}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field}) => (
          <Input
            ref={passwordInputRef}
            {...register('password')}
            label="Senha"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite sua senha"
            error={errors.password?.message as string | undefined}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              requestAnimationFrame(() => {
                confirmPasswordInputRef.current?.focus();
              });
            }}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({field}) => (
          <Input
            ref={confirmPasswordInputRef}
            {...register('confirmPassword')}
            label="Confirmar senha"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Confirme sua senha"
            error={errors.confirmPassword?.message as string | undefined}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
            onChange={field.onChange}
          />
        )}
      />

      <S.TermsRow>
        <SwitchToggle
          value={!!terms}
          onValueChange={val => setValue('acceptTerms', val)}
        />
        <Label
          text="Aceito os termos de uso"
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
        />
      </S.TermsRow>

      <Button
        type="PRIMARY"
        text="Criar Conta"
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
        loading={isLoading}
        disabled={isLoading}
      />
    </S.Container>
  );
};

export default RegisterForm;
