import React, {forwardRef} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import * as S from './styles';
import Label from '../Label/Label';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

interface CommentInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  row?: boolean;
}

const CommentInput = forwardRef<RNTextInput, CommentInputProps>(({
  value,
  onChange,
  onSend,
  placeholder = 'Escreva seu comentário aqui',
  disabled = false,
  loading = false,
  row,
}, ref) => {
  const theme = useDynamicTheme();

  return (
    <S.Container row={row}>
      <S.TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray_06}
        editable={!disabled && !loading}
        multiline
        numberOfLines={2}
      />
      <S.SendButton
        onPress={onSend}
        disabled={disabled || loading || value.trim().length === 0}
        activeOpacity={0.8}>
        <Label
          text="Enviar"
          typography={theme.typography.paragraph.sb2}
          color={theme.colors.white}
        />
      </S.SendButton>
    </S.Container>
  );
});

CommentInput.displayName = 'CommentInput';

export default CommentInput;
