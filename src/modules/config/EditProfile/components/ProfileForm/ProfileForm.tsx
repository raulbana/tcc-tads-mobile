import React from 'react';
import {Controller} from 'react-hook-form';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import * as S from './styles';

export interface ProfileFormProps {
  errors: any;
  isValid: boolean;
  register: any;
  control: any;
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  errors,
  isValid,
  register,
  control,
  isSaving,
  onSave,
  onCancel,
}) => {
  const theme = useDynamicTheme();

  const genderOptions = [
    {label: 'Masculino', value: 'male'},
    {label: 'Feminino', value: 'female'},
    {label: 'Outro', value: 'other'},
  ];

  return (
    <S.Container>
      <S.Section>
        <Label
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
          text="Informações Pessoais"
        />

        <S.InputContainer>
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                label="Nome completo"
                placeholder="Digite seu nome completo"
                value={value}
                onChange={onChange}
                error={errors.name?.message}
                required
              />
            )}
          />
        </S.InputContainer>

        <S.InputContainer>
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                label="Email"
                placeholder="Digite seu email"
                value={value}
                onChange={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
                required
              />
            )}
          />
        </S.InputContainer>
        <S.InputContainer>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text="Sexo"
          />
          <Controller
            name="gender"
            control={control}
            render={({field: {onChange, value}}) => (
              <RadioButtonGroup
                options={genderOptions}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.gender && (
            <Label
              typography={theme.typography.paragraph.sm1}
              color={theme.colors.error}
              text={errors.gender.message}
            />
          )}
        </S.InputContainer>
      </S.Section>

      <S.ActionButtons>
        <S.ButtonContainer>
          <Button
            text="Cancelar"
            type="SECONDARY"
            onPress={onCancel}
            disabled={isSaving}
          />
        </S.ButtonContainer>
        <S.ButtonContainer>
          <Button
            text={isSaving ? 'Salvando...' : 'Salvar'}
            type="PRIMARY"
            onPress={onSave}
            disabled={isSaving}
            loading={isSaving}
          />
        </S.ButtonContainer>
      </S.ActionButtons>
    </S.Container>
  );
};

export default ProfileForm;
