import {useState, useRef, useCallback} from 'react';
import {View} from 'react-native';


export const useLazyLoading = <T extends View>() => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<T>(null);

  const handleLayout = useCallback(() => {
    if (!hasBeenVisible) {
      setIsVisible(true);
      setHasBeenVisible(true);
    }
  }, [hasBeenVisible]);

  return {
    elementRef,
    isVisible,
    hasBeenVisible,
    onLayout: handleLayout,
  };
};
