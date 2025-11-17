import React from 'react';
import {TextInputProps} from 'react-native';
import * as S from './styles';
import Label from '../Label/Label';
import {ZodType} from 'zod';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

type InputType = 'text' | 'date' | 'time';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validationSchema?: ZodType<any>;
  error?: string;
  onValidate?: (isValid: boolean) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  disabled,
  validationSchema,
  error,
  onValidate,
  ...rest
}) => {
  React.useEffect(() => {
    if (validationSchema && onValidate) {
      const result = validationSchema.safeParse(value);
      onValidate(result.success);
    }
  }, [value, validationSchema, onValidate]);

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
      <S.InputContainer disabled={disabled} error={!!error}>
        <S.StyledInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          editable={!disabled}
          keyboardType={type === 'text' ? 'default' : 'numeric'}
          style={{color: theme.colors.gray_08}}
          {...rest}
        />
      </S.InputContainer>
      {error && (
        <Label
          typography={theme.typography.paragraph.sm1}
          color={theme.colors.error}
          text={error}
        />
      )}
    </S.Wrapper>
  );
};

export default Input;
