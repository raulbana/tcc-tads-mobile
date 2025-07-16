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
  text?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'LEFT' | 'RIGHT';
}

const Button: React.FC<ButtonProps> = ({
  type = 'PRIMARY',
  size = 'MEDIUM',
  onPress,
  disabled,
  text,
  icon,
  iconPosition,
}) => {
  const {getTextColor, getButtonTextSize} = useButton();
  return (
    <S.ButtonContainer
      type={type}
      size={size}
      onPress={onPress}
      disabled={disabled}>
      {icon && iconPosition === 'LEFT' && icon}
      {text && typeof text === 'string' ? (
        <Label
          text={text}
          typography={getButtonTextSize(size)}
          color={getTextColor(type)}
        />
      ) : (
        <>{text}</>
      )}
      {icon && iconPosition === 'RIGHT' && icon}
    </S.ButtonContainer>
  );
};

export default Button;
