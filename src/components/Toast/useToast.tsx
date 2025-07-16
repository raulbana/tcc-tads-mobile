import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {ToastType} from './Toast';
import theme from '../../theme/theme';

const useToast = (isOpen: boolean, duration: number, onClose?: () => void) => {
  const getTextColor = (type: ToastType) => {
    switch (type) {
      case 'SUCCESS':
        return theme.colors.white;
      case 'ERROR':
        return theme.colors.white;
      case 'INFO':
        return theme.colors.white;
      case 'WARNING':
        return theme.colors.gray_08;
      default:
        return theme.colors.gray_08;
    }
  };

  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      timeoutRef.current = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished && onClose) onClose();
        });
      }, duration);
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, duration, onClose, opacity]);

  return {opacity, getTextColor};
};

export default useToast;
