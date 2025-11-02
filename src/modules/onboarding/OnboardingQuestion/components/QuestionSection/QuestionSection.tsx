import React from 'react';
import {Question} from '../../../../../types/question';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import SliderInput from '../../../../../components/Slider/SliderInput';
import {Control, useFormState} from 'react-hook-form';
import {ICIQAnswers} from '../../schema/questionnaire';
import {useQuestionSection} from './useQuestionSection';
import DatePickerInput from '../../../../../components/DatePicker/DatePicker';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

export interface QuestionProps {
  question: Question;
  control: Control<ICIQAnswers>;
  onContinue: (id: keyof ICIQAnswers) => void;
  setValue: (name: keyof ICIQAnswers, value: any) => void;
}

const QuestionSection: React.FC<QuestionProps> = ({
  question,
  control,
  onContinue,
  setValue,
}) => {
  const {text: questionText, type, options, min, max, step} = question;

  const theme = useDynamicTheme();

  const {errors} = useFormState({control});
  const fieldError = errors[question.id as keyof ICIQAnswers];

  const {
    localValue,
    validDate,
    handleContinue,
    handleTextChange,
    handleDateChange,
    handleRadioChange,
    handleSliderChange,
    handleCheckboxGroupChange,
  } = useQuestionSection({question, control, onContinue, setValue});

  const renderInputByType = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            value={localValue as string}
            onChangeText={handleTextChange}
            placeholder="Digite sua resposta"
            error={fieldError?.message}
            required={question.required}
            onChange={handleTextChange}
          />
        );

      case 'date':
        return (
          <DatePickerInput
            value={validDate(localValue) ?? new Date()}
            onChange={(date: Date) => {
              handleDateChange(date.toISOString());
            }}
            onCancel={() => {}}
            modal={false}
            maximumDate={new Date()}
            mode="date"
            
          />
        );

      case 'radio':
        return (
          <RadioButtonGroup
            options={options || []}
            value={localValue}
            onChange={handleRadioChange}
          />
        );

      case 'slider':
        return (
          <SliderInput
            value={localValue as number}
            onValueChange={handleSliderChange}
            min={min ?? 0}
            max={max}
            step={step}
          />
        );

      case 'checkbox':
        return (
          <RadioButtonGroup
            options={options || []}
            value={localValue as string[]}
            onChange={(updated: string[] | string) => {
              const arr = Array.isArray(updated) ? updated : [updated];
              handleCheckboxGroupChange(arr);
            }}
            multiSelect={true}
          />
        );

      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.QuestionContainer>
        <Label
          typography={theme.typography.title.h5}
          color={theme.colors.gray_08}
          text={questionText}
        />

        <S.InputContainer>{renderInputByType()}</S.InputContainer>
      </S.QuestionContainer>

      <S.ButtonContainer>
        <Button text="Continuar" onPress={handleContinue} />
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default QuestionSection;
