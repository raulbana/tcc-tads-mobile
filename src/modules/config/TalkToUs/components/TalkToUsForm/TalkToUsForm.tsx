import React from 'react';
import {Controller} from 'react-hook-form';
import * as S from './styles';
import useTalkToUsForm from './useTalkToUsForm';
import Input from '../../../../../components/Input/Input';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import Button from '../../../../../components/Button/Button';

const TalkToUsForm: React.FC = () => {
  const {control, handleSubmit, errors, onSubmit, register} = useTalkToUsForm();

  return (
    <S.FormContainer>
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
            />
          )}
        />
      </S.FieldGroup>
      <S.ButtonContainer>
        <Button
          type="PRIMARY"
          text="Enviar Mensagem"
          onPress={handleSubmit(onSubmit)}
        />
      </S.ButtonContainer>
    </S.FormContainer>
  );
};

export default TalkToUsForm;
