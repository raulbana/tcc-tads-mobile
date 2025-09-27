import React from 'react';
import {Controller} from 'react-hook-form';
import * as S from './styles';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import useForgotPasswordVerifyForm from './useForgotPasswordVerifyForm';
import OTPInput from '../../../../../components/OTPInput/OTPInput';

interface ForgotPasswordVerifyFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

const ForgotPasswordVerifyForm: React.FC<ForgotPasswordVerifyFormProps> = ({
  onSuccess,
  onBack,
}) => {
  const {register, handleSubmit, errors, control, onSubmit, onBackCleanup} =
    useForgotPasswordVerifyForm(onSuccess);

  return (
    <S.Container>
      <Controller
        control={control}
        name="otp"
        render={({field}) => (
          <OTPInput
            length={4}
            hasError={!!errors.otp}
            value={field.value}
            onChange={field.onChange}
            error={errors.otp?.message}
            text="Código de verificação"
          />
        )}
      />
      <Controller
        control={control}
        name="newPassword"
        render={({field}) => (
          <Input
            {...register('newPassword')}
            label="Nova senha"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite sua nova senha"
            error={errors.newPassword?.message as string | undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({field}) => (
          <Input
            {...register('confirmPassword')}
            label="Confirmar senha"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite sua senha"
            error={errors.confirmPassword?.message as string | undefined}
            secureTextEntry
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({field}) => (
          <Input
            {...register('confirmPassword')}
            label="Confirmar senha"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Confirme sua senha"
            error={errors.confirmPassword?.message as string | undefined}
            secureTextEntry
            onChange={field.onChange}
          />
        )}
      />
      <S.ButtonContainer>
        <S.ButtonsSection>
          <Button
            type="PRIMARY"
            text="Salvar"
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
          />
          <Button
            type="SECONDARY"
            text="Voltar"
            onPress={() => {
              onBackCleanup();
              onBack();
            }}
          />
        </S.ButtonsSection>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default ForgotPasswordVerifyForm;
