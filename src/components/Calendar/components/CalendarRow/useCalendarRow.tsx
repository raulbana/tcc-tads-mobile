import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {CalendarDayDTO} from '../../../../types/diary';
import {useCallback, useEffect, useState} from 'react';

export const ITEM_WIDTH = 64;
export const SPACING = 8;

export const useCalendarRow = () => {
  const [days, setDays] = useState<CalendarDayDTO[]>([]);

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const initializeDays = useCallback(() => {
    const today = new Date();
    const generatedDays: CalendarDayDTO[] = [];

    const formatDateLocal = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    for (let i = -3; i <= 3; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      const dayTitle = currentDay.toLocaleDateString('pt-BR', {
        weekday: 'short',
      });
      const dayNumber = currentDay.getDate();
      const isToday = i === 0;

      generatedDays.push({
        date: formatDateLocal(currentDay),
        leakageLevel: 'NONE',
        eventsCount: 0,
        completedExercises: 0,
        urinationData: [],
        dayTitle,
        dayNumber,
        isToday,
      });
    }

    return generatedDays;
  }, []);

  useEffect(() => {
    const newDays = initializeDays();
    setDays(newDays);
  }, [initializeDays]);

  return {scrollX, scrollHandler, days};
};
