import {useRef, useMemo, useEffect} from 'react';
import {Animated, Dimensions} from 'react-native';

interface UseBottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxHeightPercent: number;
  closeOnBackdropPress: boolean;
}

const useBottomModal = ({
  isOpen,
  onClose,
  maxHeightPercent,
  closeOnBackdropPress,
}: UseBottomModalProps) => {
  const screenH = Dimensions.get('window').height;
  const translateY = useRef(new Animated.Value(screenH)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  const maxHeight = useMemo(
    () => Math.max(0, Math.min(1, maxHeightPercent)) * screenH,
    [maxHeightPercent],
  );

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 4,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: screenH,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, backdrop, translateY]);

  const onPressBackdrop = () => {
    if (closeOnBackdropPress) onClose();
  };

  return {
    translateY,
    backdrop,
    maxHeight,
    onPressBackdrop,
  };
};

export default useBottomModal;
