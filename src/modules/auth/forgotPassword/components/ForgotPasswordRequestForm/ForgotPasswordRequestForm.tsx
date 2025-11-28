import React from 'react';
import {Controller} from 'react-hook-form';
import * as S from './styles';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import useForgotPasswordRequestForm from './useForgotPasswordRequestForm';
import Label from '../../../../../components/Label/Label';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

interface ForgotPasswordRequestFormProps {
  onSuccess: () => void;
}

const ForgotPasswordRequestForm: React.FC<ForgotPasswordRequestFormProps> = ({
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
    navigateToLogin,
    isLoading,
  } = useForgotPasswordRequestForm(onSuccess);

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
            error={errors.email?.message as string | undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
            loading={isLoading}
            disabled={isLoading}
          />
          <S.GoToLoginButton onPress={navigateToLogin}>
            <Label
              text="Voltar para login"
              color={theme.colors.purple_04}
              typography={theme.typography.paragraph.sm3}
            />
          </S.GoToLoginButton>
        </S.ButtonsSection>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default ForgotPasswordRequestForm;
