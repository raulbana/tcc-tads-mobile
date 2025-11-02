import {useState, useEffect} from 'react';
import {Control} from 'react-hook-form';
import {ICIQAnswers} from '../../schema/questionnaire';
import {Question} from '../../../../../types/question';

export interface UseQuestionSectionProps {
  question: Question;
  control: Control<ICIQAnswers>;
  onContinue: (id: keyof ICIQAnswers) => void;
  setValue: (name: keyof ICIQAnswers, value: any) => void;
}

const isNumericField = (fieldId: string): boolean => {
  return ['q3_frequency', 'q4_amount', 'q5_interference'].includes(fieldId);
};

const convertToNumberIfNeeded = (
  value: string | number,
  fieldId: string,
): string | number => {
  if (isNumericField(fieldId)) {
    if (typeof value === 'string') {
      const num = Number(value);
      return isNaN(num) ? value : num;
    }
    return value;
  }
  return value;
};

export const useQuestionSection = ({
  question,
  onContinue,
  setValue,
}: UseQuestionSectionProps) => {
  const {id, type, min} = question;

  const getInitialValue = () => {
    switch (type) {
      case 'text':
        return '';
      case 'date':
        return new Date().toISOString();
      case 'slider':
        return min || 0;
      case 'radio':
        return isNumericField(id) ? 0 : '';
      case 'checkbox':
        return [];
      default:
        return '';
    }
  };

  const [localValue, setLocalValue] = useState<string | number | string[]>(
    getInitialValue(),
  );

  useEffect(() => {
    setLocalValue(getInitialValue());
  }, [id, type, min]);

  const validDate = (value?: string | number | string[] | Date) => {
    if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime()) ? date : null;
    }
    if (typeof value === 'number') {
      const date = new Date(value);
      return !isNaN(date.getTime()) ? date : null;
    }
    if (value instanceof Date) {
      return !isNaN(value.getTime()) ? value : null;
    }
    return null;
  };

  const handleContinue = () => {
    setValue(id as keyof ICIQAnswers, localValue);
    onContinue(id as keyof ICIQAnswers);
  };

  const handleTextChange = (value: string) => {
    setLocalValue(value);
    setValue(id as keyof ICIQAnswers, value);
  };

  const handleDateChange = (val: string) => {
    const dateValue = new Date(val).toISOString();
    setLocalValue(dateValue);
    setValue(id as keyof ICIQAnswers, dateValue);
  };

  const handleRadioChange = (value: string | number) => {
    const convertedValue = convertToNumberIfNeeded(value, id);
    setLocalValue(convertedValue);
    setValue(id as keyof ICIQAnswers, convertedValue);
  };

  const handleSliderChange = (value: number) => {
    setLocalValue(value);
    setValue(id as keyof ICIQAnswers, value);
  };

  const handleCheckboxGroupChange = (values: string[]) => {
    setLocalValue(values);
    setValue(id as keyof ICIQAnswers, values);
  };

  const isCheckboxChecked = (optionValue: string) => {
    return Array.isArray(localValue) && localValue.includes(optionValue);
  };

  return {
    localValue,
    validDate,
    handleContinue,
    handleTextChange,
    handleDateChange,
    handleRadioChange,
    handleSliderChange,
    handleCheckboxGroupChange,
    isCheckboxChecked,
  };
};
