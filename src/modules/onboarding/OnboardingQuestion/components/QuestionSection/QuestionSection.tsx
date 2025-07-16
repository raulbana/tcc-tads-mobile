import React from 'react';
import {Question} from '../../../../../types/question';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import Button from '../../../../../components/Button/Button';
import {Control, Controller} from 'react-hook-form';
import {ICIQAnswers} from '../../schema/questionnaire';
import SliderQuestion from '../../../../../components/Slider/SliderInput';
export interface QuestionProps {
  question: Question;
  control?: Control<ICIQAnswers>;
  onContinue: (field: keyof ICIQAnswers) => void;
}

const QuestionSection: React.FC<QuestionProps> = ({
  question,
  control,
  onContinue,
}) => {
  const validDate = (value?: string | number | string[] | Date) => {
    if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime()) ? date : null;
    }
    if (typeof value === 'number') {
      const date = new Date(value);
      return !isNaN(date.getTime()) ? date : null;
    }
    if (Array.isArray(value) && value.length > 0) {
      const date = new Date(value[0]);
      return !isNaN(date.getTime()) ? date : null;
    }
    if (value instanceof Date && !isNaN(value.getTime())) {
      return value;
    }
    return null;
  };

  const {id, text, type, options, min, max, step} = question;

  return (
    <S.Wrapper>
      <Label
        typography={theme.typography.title.h4}
        color={theme.colors.gray_08}
        text={text}
      />
      <Controller
        control={control}
        name={id as keyof ICIQAnswers}
        render={({field: {onChange: onFieldChange, value}}) => (
          <>
            {type === 'date' && (
              <DatePicker
                value={validDate(value) ?? new Date()}
                onChange={(date: Date) => {
                  onFieldChange(date.toISOString());
                }}
                onCancel={() => {}}
                modal={false}
                maximumDate={new Date()}
                mode="date"
              />
            )}
            {type === 'radio' && (
              <RadioButtonGroup
                options={options || []}
                value={value}
                onChange={selected => {
                  onFieldChange(selected);
                }}
              />
            )}
            {type === 'slider' && (
              <SliderQuestion
                value={value as number}
                onValueChange={selected => {
                  onFieldChange(selected);
                }}
                min={min ?? 0}
                max={max}
                step={step}
              />
            )}
            {type === 'checkbox' && (
              <RadioButtonGroup
                options={options || []}
                value={value}
                onChange={selected => {
                  onFieldChange(selected);
                }}
                multiSelect={true}
              />
            )}
          </>
        )}
      />
      <S.ButtonContainer>
        <Button
          text={'Continuar'}
          onPress={() => {
            onContinue(id as keyof ICIQAnswers);
          }}
        />
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default QuestionSection;
