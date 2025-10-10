import React from 'react';
import {Controller} from 'react-hook-form';
import * as S from './styles';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import useForgotPasswordRequestForm from './useForgotPasswordRequestForm';
import { TouchableOpacity } from 'react-native';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';

interface ForgotPasswordRequestFormProps {
  onSuccess: () => void;
}

const ForgotPasswordRequestForm: React.FC<ForgotPasswordRequestFormProps> = ({
  onSuccess,
}) => {
  const {register, handleSubmit, errors, control, onSubmit, navigateToLogin} =
    useForgotPasswordRequestForm(onSuccess);

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
            autoCapitalize="words"
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
