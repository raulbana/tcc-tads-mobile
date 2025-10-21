import React from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import * as S from './styles';
import Label from '../Label/Label';
import {X} from 'phosphor-react-native';
import {moderateScale} from '../../utils/scales';
import useBottomModal from './useBottomModal';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export type BottomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  closeOnBackdropPress?: boolean;
  showClose?: boolean;
  showHandle?: boolean;
  maxHeightPercent?: number;
  containerStyle?: ViewStyle;
  testID?: string;
};

const BottomModal: React.FC<BottomModalProps> = ({
  isOpen,
  onClose,
  title,
  footer,
  children,
  closeOnBackdropPress = true,
  showClose = true,
  showHandle = true,
  maxHeightPercent = 0.85,
  containerStyle,
  testID,
}) => {
  const {translateY, backdrop, maxHeight, onPressBackdrop} = useBottomModal({
    isOpen,
    onClose,
    maxHeightPercent,
    closeOnBackdropPress,
  });

  const theme = useDynamicTheme();

  return (
    <Modal
      visible={isOpen}
      transparent
      hardwareAccelerated
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={onClose}>
      <S.Root pointerEvents="box-none" testID={testID}>
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <Animated.View
            style={[
              S.backdropStyle,
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#000',
                opacity: backdrop.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            S.animatedSheetStyle,
            {
              transform: [{translateY}],
            },
          ]}>
          <KeyboardAvoidingView
            behavior={Platform.select({ios: 'padding', android: undefined})}
            style={{maxHeight, width: '100%'}}>
            <S.Container style={containerStyle}>
              {showHandle && <S.Handle />}

              {(title || showClose) && (
                <S.Header>
                  {typeof title === 'string' ? (
                    <Label
                      text={title}
                      typography={theme.typography.paragraph.sb3}
                      color={theme.colors.gray_08}
                    />
                  ) : (
                    title ?? <S.HeaderSpacer />
                  )}
                  {showClose && (
                    <S.IconButton
                      accessibilityRole="button"
                      accessibilityLabel="Fechar"
                      onPress={onClose}>
                      <X
                        size={moderateScale(20)}
                        color={theme.colors.gray_07}
                      />
                    </S.IconButton>
                  )}
                </S.Header>
              )}

              <S.Content>{children}</S.Content>

              {footer && <S.Footer>{footer}</S.Footer>}
            </S.Container>
          </KeyboardAvoidingView>
        </Animated.View>
      </S.Root>
    </Modal>
  );
};

export default BottomModal;
