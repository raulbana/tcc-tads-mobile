import React from 'react';
import {TextInputProps, TextInput} from 'react-native';
import * as S from './styles';
import Label from '../Label/Label';
import {ZodType} from 'zod';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

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

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
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
    },
    ref,
  ) => {
    React.useEffect(() => {
      if (validationSchema && onValidate) {
        const result = validationSchema.safeParse(value);
        onValidate(result.success);
      }
    }, [value, validationSchema, onValidate]);

    const theme = useDynamicTheme();

    const emailKeyboardType = rest.keyboardType === 'email-address';
    const finalAutoCapitalize = emailKeyboardType
      ? 'none'
      : rest.autoCapitalize !== undefined
      ? rest.autoCapitalize
      : 'none';

    const maxLength = rest.maxLength;
    const showCharCounter = maxLength !== undefined;
    const charCount = value?.length || 0;

    return (
      <S.Wrapper>
        {label && (
          <S.LabelContainer>
            <Label
              typography={theme.typography.paragraph.r3}
              color={theme.colors.gray_08}
              text={label}
            />
            {required && (
              <Label
                typography={theme.typography.paragraph.r3}
                color={theme.colors.gray_08}
                text=" *"
              />
            )}
            {showCharCounter && (
              <S.CharCounter
                color={
                  charCount > maxLength
                    ? theme.colors.error
                    : theme.colors.gray_06
                }>
                {`${charCount}/${maxLength}`}
              </S.CharCounter>
            )}
          </S.LabelContainer>
        )}
        <S.InputContainer disabled={disabled} error={!!error}>
          <S.StyledInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            editable={!disabled}
            keyboardType={type === 'text' ? 'default' : 'numeric'}
            autoCorrect={false}
            {...rest}
            autoCapitalize={finalAutoCapitalize}
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
  },
);

Input.displayName = 'Input';

export default Input;
