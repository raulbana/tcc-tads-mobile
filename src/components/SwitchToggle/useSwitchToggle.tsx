import {useCallback, useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

interface useSwitchToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const useSwitchToggle = ({
  value,
  onValueChange,
  disabled,
}: useSwitchToggleProps) => {
  const thumbAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(thumbAnim, {
      toValue: value ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [value, thumbAnim]);

  const handlePress = useCallback(() => {
    if (!disabled) onValueChange(!value);
  }, [value, onValueChange, disabled]);

  return {thumbAnim, handlePress};
};

export default useSwitchToggle;
