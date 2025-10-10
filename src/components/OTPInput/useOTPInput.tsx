import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
} from 'react';
import {TextInput} from 'react-native';

interface UseOTPInputParams {
  length: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

const buildArrayFromValue = (value: string | undefined, length: number) => {
  const digits = value ? value.replace(/\D/g, '').slice(0, length) : '';
  return Array.from({length}, (_, idx) => digits[idx] ?? '');
};

const useOTPInput = ({
  length,
  value,
  onValueChange,
  
}: UseOTPInputParams): {
  values: string[];
  onChangeDigit: (index: number, text: string) => number | null;
  onKeyPress: (index: number, key: string) => number | null;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  inputsRef: MutableRefObject<Array<TextInput | null>>;
} => {
  const inputsRef = useRef<Array<TextInput | null>>(Array(length).fill(null));
  const [values, setValues] = useState<string[]>(() =>
    buildArrayFromValue(value, length),
  );
  const [selectedIndex, setSelectedIndex] = useState(
    () => values.findIndex(d => d === '') || 0,
  );

  useEffect(() => {
    const next = buildArrayFromValue(value, length);
    setValues(prev => {
      if (prev.join('') === next.join('')) return prev;
      return next;
    });
    const firstEmpty = next.findIndex(digit => digit === '');
    setSelectedIndex(firstEmpty === -1 ? length - 1 : firstEmpty);
  }, [value, length]);

  const commitValues = useCallback(
    (updater: (prev: string[]) => string[]) => {
      setValues(prev => {
        const next = updater(prev);
        onValueChange?.(next.join(''));
        return next;
      });
    },
    [onValueChange],
  );

  const onChangeDigit = useCallback(
    (index: number, text: string) => {
      const sanitized = text.replace(/\D/g, '');
      let nextFocus: number | null = null;

      commitValues(prev => {
        const next = [...prev];
        if (!sanitized) {
          next[index] = '';
          nextFocus = index;
          return next;
        }

        let cursor = index;
        sanitized.split('').forEach(char => {
          if (cursor < length) {
            next[cursor] = char;
            cursor += 1;
          }
        });

        nextFocus = cursor < length ? cursor : null;
        return next;
      });

      const focusIndex =
        nextFocus === null ? length - 1 : Math.min(nextFocus, length - 1);
      setSelectedIndex(focusIndex);
      return nextFocus;
    },
    [commitValues, length],
  );

  const onKeyPress = useCallback(
    (index: number, key: string) => {
      if (key !== 'Backspace') return null;

      let nextFocus: number | null = index;

      commitValues(prev => {
        const next = [...prev];
        if (next[index]) {
          next[index] = '';
          nextFocus = index;
        } else if (index > 0) {
          next[index - 1] = '';
          nextFocus = index - 1;
        } else {
          nextFocus = 0;
        }
        return next;
      });

      setSelectedIndex(nextFocus);
      return nextFocus;
    },
    [commitValues],
  );

  return {
    values,
    onChangeDigit,
    onKeyPress,
    selectedIndex,
    setSelectedIndex,
    inputsRef,
  };
};

export default useOTPInput;
