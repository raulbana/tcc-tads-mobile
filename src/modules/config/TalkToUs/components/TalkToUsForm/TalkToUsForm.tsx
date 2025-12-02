import React from 'react';
import {Controller} from 'react-hook-form';
import * as S from './styles';
import useTalkToUsForm from './useTalkToUsForm';
import Input from '../../../../../components/Input/Input';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import Loader from '../../../../../components/Loader/Loader';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';

const TalkToUsForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    register,
    isLoading,
    isSuccess,
  } = useTalkToUsForm();

  const theme = useDynamicTheme();

  return (
    <S.FormContainer>
      {isSuccess && (
        <S.SuccessMessage>
          <Label
            text="Mensagem enviada com sucesso! Entraremos em contato em breve."
            typography={theme.typography.paragraph.r3}
            color={theme.colors.success}
          />
        </S.SuccessMessage>
      )}

      <S.FieldGroup>
        <Label
          text="E-mail"
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
        <Controller
          control={control}
          {...register('email')}
          render={({field}) => (
            <Input
              type="text"
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder="Digite seu e-mail"
              required
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          )}
        />
      </S.FieldGroup>
      <S.FieldGroup>
        <Label
          text="Assunto"
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
        <Controller
          control={control}
          {...register('subject')}
          render={({field}) => (
            <Input
              type="text"
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder="Digite o assunto da mensagem"
              required
              error={errors.subject?.message}
              editable={!isLoading}
            />
          )}
        />
      </S.FieldGroup>
      <S.FieldGroup>
        <Label
          text="Mensagem"
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
        <Controller
          control={control}
          {...register('message')}
          render={({field}) => (
            <Input
              type="text"
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder="Digite a mensagem"
              required
              multiline
              numberOfLines={4}
              error={errors.message?.message}
              editable={!isLoading}
            />
          )}
        />
      </S.FieldGroup>
      <S.ButtonContainer>
        <Button
          type="PRIMARY"
          text={isLoading ? 'Enviando...' : 'Enviar Mensagem'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
        {isLoading && (
          <S.LoaderContainer>
            <Loader />
          </S.LoaderContainer>
        )}
      </S.ButtonContainer>
    </S.FormContainer>
  );
};

export default TalkToUsForm;
