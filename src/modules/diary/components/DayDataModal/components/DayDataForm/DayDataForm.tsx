import React from 'react';
import {Controller} from 'react-hook-form';
import {useDayDataForm, DayDataFormValues} from './useDayDataForm';
import * as S from './styles';
import Input from '../../../../../../components/Input/Input';
import Label from '../../../../../../components/Label/Label';
import RadioBoxInput from '../../../../../../components/RadioBoxInput/RadioBoxInput';
import DatePickerInput from '../../../../../../components/DatePicker/DatePicker';
import Button from '../../../../../../components/Button/Button';
import {volumeOptions, yesNoOptions} from './schema/dayDataFormSchema';
import { useDynamicTheme } from '../../../../../../hooks/useDynamicTheme';

export interface DayDataFormProps {
  defaultValues?: Partial<DayDataFormValues>;
  onSubmit: (data: DayDataFormValues) => void;
  onCancel?: () => void;
  loading?: boolean;
  baseDate?: Date;
}

const DayDataForm: React.FC<DayDataFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  loading,
  baseDate,
}) => {
  const {
    control,
    errors,
    isValid,
    handleConfirm,
    setTimeFromDate,
    currentTimeDate,
  } = useDayDataForm({defaultValues, onSubmit, baseDate});
  const theme = useDynamicTheme();

  return (
    <S.FormContainer>
      <S.FieldGroup>
        <Label
          text="Horário"
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
        <Controller
          control={control}
          name="time"
          render={() => (
            <DatePickerInput
              modal
              mode="time"
              value={currentTimeDate}
              onChange={setTimeFromDate}
              onCancel={() => {}}
            />
          )}
        />
        {errors.time && (
          <Label
            text={errors.time.message}
            color={theme.colors.error}
            typography={theme.typography.paragraph.sm1}
          />
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <Controller
          control={control}
          name="amount"
          render={({field}) => (
            <RadioBoxInput
              label="Volume"
              options={[...volumeOptions]}
              value={field.value ?? ''}
              onChange={field.onChange}
              columns={3}
            />
          )}
        />
        {errors.amount && (
          <Label
            text={errors.amount.message}
            color={theme.colors.error}
            typography={theme.typography.paragraph.sm1}
          />
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <Controller
          control={control}
          name="urgency"
          render={({field}) => (
            <RadioBoxInput
              label="Urgência"
              options={[...yesNoOptions]}
              value={field.value || ''}
              onChange={field.onChange}
              columns={2}
            />
          )}
        />
        {errors.urgency && (
          <Label
            text={errors.urgency.message}
            color={theme.colors.error}
            typography={theme.typography.paragraph.sm1}
          />
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <Controller
          control={control}
          name="leakage"
          render={({field}) => (
            <RadioBoxInput
              label="Perda"
              options={[...yesNoOptions]}
              value={field.value || ''}
              onChange={field.onChange}
              columns={2}
            />
          )}
        />
        {errors.leakage && (
          <Label
            text={errors.leakage.message}
            color={theme.colors.error}
            typography={theme.typography.paragraph.sm1}
          />
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <Controller
          control={control}
          name="reason"
          render={({field}) => (
            <Input
              label="Motivo"
              value={field.value ?? ''}
              onChangeText={field.onChange}
              placeholder="Descreva (opcional)"
              multiline
              numberOfLines={3}
              onChange={field.onChange}
            />
          )}
        />
        {errors.reason && (
          <Label
            text={errors.reason.message}
            color={theme.colors.error}
            typography={theme.typography.paragraph.sm1}
          />
        )}
      </S.FieldGroup>

      <S.ButtonContainer>
        {onCancel && (
          <Button
            type="SECONDARY"
            text={
              <Label
                typography={theme.typography.paragraph.sb2}
                color={theme.colors.purple_04}
                text="Cancelar"
              />
            }
            onPress={onCancel}
          />
        )}
        <Button
          disabled={!isValid || loading}
          onPress={handleConfirm}
          text={
            <Label
              typography={theme.typography.paragraph.sb2}
              color={theme.colors.white}
              text="Confirmar"
            />
          }
        />
      </S.ButtonContainer>
    </S.FormContainer>
  );
};

export default DayDataForm;
