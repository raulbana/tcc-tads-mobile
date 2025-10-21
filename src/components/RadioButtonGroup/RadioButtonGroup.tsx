import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import {QuestionOptions} from '../../types/question';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

type RadioButtonGroupProps = {
  options: QuestionOptions[];
  value: any;
  onChange: (value: any) => void;
  multiSelect?: boolean;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  value,
  onChange,
  multiSelect = false,
}) => {
  const handleSingleSelect = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleMultiSelect = (optionValue: string) => {
    const arr = Array.isArray(value) ? value : [];
    if (arr.includes(optionValue)) {
      onChange(arr.filter((v: string) => v !== optionValue));
    } else {
      onChange([...arr, optionValue]);
    }
  };

  const theme = useDynamicTheme();

  return (
    <S.Container>
      {options.map(option => {
        const selected = multiSelect
          ? Array.isArray(value) && value.includes(option.value)
          : value === option.value;
        return (
          <S.OptionButton
            key={option.value}
            onPress={() =>
              multiSelect
                ? handleMultiSelect(option.value)
                : handleSingleSelect(option.value)
            }
            selected={selected}
            accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
            accessibilityState={{selected}}>
            <Label
              text={option.label}
              typography={theme.typography.paragraph.b3}
              color={selected ? theme.colors.purple_04 : theme.colors.gray_08}
              textAlign="center"
            />
          </S.OptionButton>
        );
      })}
    </S.Container>
  );
};

export default RadioButtonGroup;
