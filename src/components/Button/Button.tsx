import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import useButton from './useButton';

export type ButtonType = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
export type ButtonSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'LEFT' | 'RIGHT';
}

const Button: React.FC<ButtonProps> = ({
  type = 'PRIMARY',
  size = 'MEDIUM',
  onPress,
  disabled,
  loading = false,
  text,
  icon,
  iconPosition,
}) => {
  const {getTextColor, getButtonTextSize, getBackgroundColor} = useButton();

  const isDisabled = disabled || loading;

  return (
    <S.ButtonContainer
      type={type}
      size={size}
      backgroundColor={getBackgroundColor(type)}
      onPress={onPress}
      disabled={isDisabled}>
      {loading && iconPosition !== 'LEFT' && (
        <S.LoadingSpinner size="small" color={getTextColor(type)} />
      )}
      {icon && iconPosition === 'LEFT' && !loading && icon}
      {text && typeof text === 'string' ? (
        <Label
          text={loading ? 'Carregando...' : text}
          typography={getButtonTextSize(size)}
          color={getTextColor(type)}
        />
      ) : (
        <>{text}</>
      )}
      {loading && iconPosition === 'LEFT' && (
        <S.LoadingSpinner size="small" color={getTextColor(type)} />
      )}
      {icon && iconPosition === 'RIGHT' && !loading && icon}
    </S.ButtonContainer>
  );
};

export default Button;
