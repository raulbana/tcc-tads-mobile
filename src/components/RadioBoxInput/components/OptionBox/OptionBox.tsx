import React from 'react';
import * as S from './styles';
import Label from '../../../Label/Label';
import { useDynamicTheme } from '../../../../hooks/useDynamicTheme';

export interface BoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface OptionBoxProps {
  option: BoxOption;
  selected: boolean;
  multiSelect: boolean;
  columns?: number;
  onPress: (opt: OptionBoxProps['option']) => void;
  label: string;
}

const OptionBox: React.FC<OptionBoxProps> = ({
  option,
  selected,
  multiSelect,
  columns,
  onPress,
  label,
}) => {
  const {disabled, value} = option;

  const theme = useDynamicTheme();
  
  return (
    <S.OptionBox
      key={value}
      accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
      accessibilityState={{selected, disabled: disabled || disabled}}
      activeOpacity={0.7}
      disabled={disabled || disabled}
      selected={selected}
      style={columns ? {flexBasis: `${100 / columns}%`} : undefined}
      onPress={() => onPress(option)}>
      <Label
        text={label}
        typography={
          selected
            ? theme.typography.paragraph.b3
            : theme.typography.paragraph.r3
        }
        color={selected ? theme.colors.purple_04 : theme.colors.gray_08}
        textAlign="center"
      />
    </S.OptionBox>
  );
};

export default OptionBox;
