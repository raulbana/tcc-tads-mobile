import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import useToast from './useToast';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export type ToastType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';

interface ToastProps {
  type: ToastType;
  message: string | React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 3000,
  icon,
  onClose,
  isOpen,
}) => {
  const {opacity, getTextColor, getBackgroundColor, getBorderColor} = useToast(
    isOpen,
    duration,
    onClose,
  );

  const theme = useDynamicTheme();

  if (!isOpen) return null;

  return (
    <S.AnimatedToastContainer
      style={{opacity}}
      type={type}
      backgroundColor={getBackgroundColor(type)}
      borderColor={getBorderColor(type)}>
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
      {typeof message === 'string' ? (
        <Label
          typography={theme.typography.paragraph.r2}
          color={getTextColor(type)}
          text={message}
        />
      ) : (
        message
      )}
    </S.AnimatedToastContainer>
  );
};

export default Toast;
