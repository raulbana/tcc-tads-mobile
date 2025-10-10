import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {CalendarDayData} from '../../../../types/diary';
import {useCallback, useEffect, useState} from 'react';

export const ITEM_WIDTH = 64;
export const SPACING = 8;

export const useCalendarRow = () => {
  const [days, setDays] = useState<CalendarDayData[]>([]);

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const initializeDays = useCallback(() => {
    const today = new Date();
    const generatedDays: CalendarDayData[] = [];

    for (let i = -3; i <= 3; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      const dayTitle = currentDay.toLocaleDateString('pt-BR', {
        weekday: 'short',
      });
      const dayNumber = currentDay.getDate();
      const isToday = i === 0;

      generatedDays.push({
        dayTitle,
        dayNumber,
        isToday,
        date: currentDay,
      });
    }

    return generatedDays;
  }, []);

  useEffect(() => {
    const newDays = initializeDays();
    console.log('Initializing days:', newDays);
    setDays(newDays);
  }, [initializeDays]);

  useEffect(() => {
    console.log('Days updated:', days.length, days);
  }, [days]);

  return {scrollX, scrollHandler, days};
};
