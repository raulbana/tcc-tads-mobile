import React, {useEffect, useMemo, useRef} from 'react';
import * as S from './styles';
import useOTPInput from './useOTPInput';
import {TextInput} from 'react-native';
import {ZodType} from 'zod';
import Label from '../Label/Label';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

interface OTPInputProps {
  length: number;
  hasError: boolean;
  value?: string;
  onChange?: (value: string) => void;
  validationSchema?: ZodType;
  onValidate?: (isValid: boolean) => void;
  error?: string;
  text?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  hasError,
  value,
  onChange,
  validationSchema,
  onValidate,
  error,
  text,
}) => {
  const {
    values,
    onChangeDigit,
    onKeyPress,
    selectedIndex,
    setSelectedIndex,
    inputsRef,
  } = useOTPInput({length, value, onValueChange: onChange});

  const combinedValue = useMemo(() => values.join(''), [values]);
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    if (validationSchema && onValidate) {
      const result = validationSchema.safeParse(combinedValue);
      onValidate(result.success);
    }
  }, [combinedValue, validationSchema, onValidate]);

  // Focar automaticamente no primeiro campo quando o componente for montado
  useEffect(() => {
    if (!hasFocusedRef.current && inputsRef.current[0] && values.every(v => v === '')) {
      hasFocusedRef.current = true;
      // Usar um pequeno delay para garantir que o componente está totalmente renderizado
      const timer = setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [values]);

  const theme = useDynamicTheme();

  return (
    <S.Wrapper>
      {text && (
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
          text={text}
        />
      )}
      <S.Container>
        {Array.from({length}).map((_, index) => (
          <S.Input
            key={index}
            ref={(ref: TextInput | null) => {
              inputsRef.current[index] = ref;
            }}
            value={values[index]}
            onChangeText={text => {
              const nextIndex = onChangeDigit(index, text);
              if (nextIndex !== null) {
                inputsRef.current[nextIndex]?.focus();
              }
            }}
            keyboardType="number-pad"
            maxLength={1}
            $isFocused={selectedIndex === index}
            $hasError={hasError}
            onFocus={() => setSelectedIndex(index)}
            onKeyPress={({nativeEvent}) => {
              const nextIndex = onKeyPress(index, nativeEvent.key);
              if (nextIndex !== null) {
                inputsRef.current[nextIndex]?.focus();
              }
            }}
            textContentType="oneTimeCode"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            selectTextOnFocus
          />
        ))}
      </S.Container>
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

export default OTPInput;
