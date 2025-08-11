import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

export const ITEM_WIDTH = 64;
export const SPACING = 8;

export const useCalendarRow = () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  
  return { scrollX, scrollHandler };
};