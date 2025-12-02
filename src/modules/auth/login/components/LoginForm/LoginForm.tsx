import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {Controller} from 'react-hook-form';
import useLoginForm from './useLoginForm';
import * as S from './styles';
import Input from '../../../../../components/Input/Input';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import SwitchToggle from '../../../../../components/SwitchToggle/SwitchToggle';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';
const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    setValue,
    register,
    onSubmit,
    remember,
    isLoading,
  } = useLoginForm();

  const passwordInputRef = useRef<TextInput>(null);

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <Controller
        control={control}
        name="email"
        render={({field}) => (
          <Input
            {...register('email')}
            label="E-mail"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite seu e-mail"
            error={errors.email?.message}
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
            {...register('password')}
            ref={passwordInputRef}
            label="Senha"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite sua senha"
            error={errors.password?.message}
            secureTextEntry
            required
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
            onChange={field.onChange}
          />
        )}
      />
      <S.CheckboxRow>
        <SwitchToggle
          value={remember as boolean}
          onValueChange={value => setValue('remember', value)}
        />
        <Label
          text="Lembrar de mim"
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
        />
      </S.CheckboxRow>
      <Button
        type="PRIMARY"
        text="Entrar"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
      />
    </S.Container>
  );
};

export default LoginForm;
