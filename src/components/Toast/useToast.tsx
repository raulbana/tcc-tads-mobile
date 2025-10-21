import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {ToastType} from './Toast';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

const useToast = (isOpen: boolean, duration: number, onClose?: () => void) => {
  const theme = useDynamicTheme();

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

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case 'SUCCESS':
        return theme.colors.success_02;
      case 'ERROR':
        return theme.colors.error_02;
      case 'INFO':
        return theme.colors.purple_02;
      case 'WARNING':
        return theme.colors.warning_02;
      default:
        return theme.colors.gray_02;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case 'SUCCESS':
        return theme.colors.success;
      case 'ERROR':
        return theme.colors.error;
      case 'INFO':
        return theme.colors.info;
      case 'WARNING':
        return theme.colors.warning;
      default:
        return theme.colors.gray_05;
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

  return {opacity, getTextColor, getBackgroundColor, getBorderColor};
};

export default useToast;
