import React, {useCallback} from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import OptionBox from './components/OptionBox/OptionBox';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface RadioBoxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioBoxInputProps {
  label?: string;
  options: RadioBoxOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiSelect?: boolean;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  columns?: number;
  allowDeselect?: boolean;
}

const RadioBoxInput: React.FC<RadioBoxInputProps> = ({
  label,
  options,
  value,
  onChange,
  multiSelect = false,
  required,
  error,
  disabled,
  columns,
  allowDeselect = false,
}) => {
  const isSelected = useCallback(
    (v: string) =>
      multiSelect ? Array.isArray(value) && value.includes(v) : value === v,
    [multiSelect, value],
  );

  const handlePress = (opt: RadioBoxOption) => {
    if (disabled || opt.disabled) return;
    if (multiSelect) {
      const arr = Array.isArray(value) ? [...value] : [];
      const idx = arr.indexOf(opt.value);
      if (idx >= 0) {
        arr.splice(idx, 1);
      } else {
        arr.push(opt.value);
      }
      onChange(arr);
    } else {
      const currently = value === opt.value;
      if (currently && allowDeselect) {
        onChange('');
      } else if (!currently) {
        onChange(opt.value);
      }
    }
  };

  const theme = useDynamicTheme();

  return (
    <S.Wrapper>
      {label && (
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
          text={label + (required ? ' *' : '')}
        />
      )}

      <S.OptionsContainer
        $columns={columns}
        pointerEvents={disabled ? 'none' : 'auto'}>
        {options.map(opt => {
          const selected = isSelected(opt.value);
          return (
            <OptionBox
              key={opt.value}
              option={opt}
              selected={selected}
              multiSelect={multiSelect}
              onPress={handlePress}
              label={opt.label}
            />
          );
        })}
      </S.OptionsContainer>

      {error && (
        <Label
          text={error}
          typography={theme.typography.paragraph.sm1}
          color={theme.colors.error}
        />
      )}
    </S.Wrapper>
  );
};

export default RadioBoxInput;
