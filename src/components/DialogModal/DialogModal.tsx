import React from 'react';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import Label from '../Label/Label';
import Button, {ButtonSize, ButtonType} from '../Button/Button';
import * as S from './styles';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export interface DialogModalButton {
  label: string;
  onPress: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  autoClose?: boolean;
}

export interface DialogModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  primaryButton?: DialogModalButton;
  secondaryButton?: DialogModalButton;
  children?: React.ReactNode;
  dismissOnBackdropPress?: boolean;
}

const DialogModal: React.FC<DialogModalProps> = ({
  visible,
  onClose,
  title,
  description,
  primaryButton,
  secondaryButton,
  children,
  dismissOnBackdropPress = true,
}) => {
  const theme = useDynamicTheme();

  const handleBackdropPress = () => {
    if (dismissOnBackdropPress) {
      onClose();
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      visible={visible}
      onRequestClose={onClose}>
      <S.ModalOverlay onPress={handleBackdropPress}>
        <TouchableWithoutFeedback>
          <S.ModalCard>
            {title && (
              <Label
                typography={theme.typography.title.b3}
                color={theme.colors.gray_08}
                text={title}
              />
            )}
            {description && (
              <Label
                typography={theme.typography.paragraph.r2}
                color={theme.colors.gray_06}
                text={description}
              />
            )}
            {children}
            {(primaryButton || secondaryButton) && (
              <S.ModalActions>
                {secondaryButton && (
                  <Button
                    type={secondaryButton.type ?? 'SECONDARY'}
                    size={secondaryButton.size ?? 'SMALL'}
                    text={secondaryButton.label}
                    onPress={secondaryButton.onPress}
                    loading={secondaryButton.loading}
                    disabled={secondaryButton.disabled}
                  />
                )}
                {primaryButton && (
                  <Button
                    type={primaryButton.type ?? 'PRIMARY'}
                    size={primaryButton.size ?? 'SMALL'}
                    text={primaryButton.label}
                    onPress={primaryButton.onPress}
                    loading={primaryButton.loading}
                    disabled={primaryButton.disabled}
                  />
                )}
              </S.ModalActions>
            )}
          </S.ModalCard>
        </TouchableWithoutFeedback>
      </S.ModalOverlay>
    </Modal>
  );
};

export default DialogModal;

