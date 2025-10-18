import {useMemo, useState, useCallback, useEffect} from 'react';
import moment, {Moment} from 'moment';
import {
  CalendarDayDTO,
  LeakageLevel,
  UrinationDataDTO,
} from '../../../../types/diary';
import {
  buildMonthMatrix,
  formatToFirstLetterUppercase,
  getMonthIsoRange,
} from '../../../../utils/calendarUtils';
import {useDiary} from '../../../../contexts/DiaryContext';
import {useWindowDimensions} from 'react-native';
import {horizontalScale} from '../../../../utils/scales';

export function useCalendar() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);

  const [isDeletingModalOpen, setIsDeletingModalOpen] =
    useState<boolean>(false);
  const [selectedRegisterItem, setSelectedRegisterItem] =
    useState<UrinationDataDTO | null>(null);

  const [selectedDayItem, setSelectedDayItem] = useState<CalendarDayDTO | null>(
    null,
  );

  const onPressDay = useCallback((dayItem: CalendarDayDTO) => {
    setSelectedDayItem(dayItem);
    setIsRegisterModalOpen(true);
  }, []);

  const COLUMNS = 6;
  const CELL_GAP = horizontalScale(8);
  const PADDING_H = horizontalScale(16);

  const [monthRef, setMonthRef] = useState<Moment>(moment());

  const matrix = useMemo(() => buildMonthMatrix(monthRef), [monthRef]);

  const {calendarData, isLoading} = useDiary();

  const onEditRegister = useCallback(
    (register: UrinationDataDTO) => {
      setIsRegisterModalOpen(false);
      setSelectedRegisterItem(register);
      setIsEditingModalOpen(true);
    },
    [selectedDayItem, selectedRegisterItem],
  );

  const onDeleteRegister = useCallback(
    (register: UrinationDataDTO) => {
      setIsRegisterModalOpen(false);
      setSelectedRegisterItem(register);
      setIsDeletingModalOpen(true);
    },
    [selectedDayItem, selectedRegisterItem],
  );

  const findRegisterIndex = useCallback(
    (register: UrinationDataDTO, dayData: CalendarDayDTO) => {
      return dayData.urinationData.findIndex(item => {
        const itemTime = Array.isArray(item.time)
          ? `${item.time[0]}:${item.time[1]}`
          : item.time;
        const registerTime = Array.isArray(register.time)
          ? `${register.time[0]}:${register.time[1]}`
          : register.time;
        return itemTime === registerTime;
      });
    },
    [],
  );

  const daysFlat: CalendarDayDTO[] = useMemo(() => {
    const backendMap: Record<string, CalendarDayDTO> = calendarData ?? {};

    const selectedMonth = monthRef.month();
    const selectedYear = monthRef.year();

    const monthDays = matrix
      .flat()
      .filter(
        cell =>
          cell.date.month() === selectedMonth &&
          cell.date.year() === selectedYear,
      );

    return monthDays.map(cell => {
      const key = cell.date.format('YYYY-MM-DD');
      const dayData = backendMap[key];
      const level =
        (dayData?.leakageLevel as LeakageLevel | undefined) ?? undefined;

      return {
        date: cell.date.format('YYYY-MM-DD'),
        leakageLevel: dayData?.leakageLevel || 'NONE',
        eventsCount: dayData?.eventsCount || 0,
        completedExercises: dayData?.completedExercises || 0,
        notesPreview: dayData?.notesPreview,
        urinationData: dayData?.urinationData || [],
        dayTitle: formatToFirstLetterUppercase(cell.date.format('ddd')),
        dayNumber: Number(cell.date.format('D')),
        isToday: cell.isToday,
      };
    });
  }, [matrix, calendarData, monthRef]);

  const goPrevMonth = useCallback(
    () => setMonthRef(m => m.clone().subtract(1, 'month')),
    [],
  );

  const goNextMonth = useCallback(
    () => setMonthRef(m => m.clone().add(1, 'month')),
    [],
  );

  const setMonth = useCallback((year: number, monthIndex0Based: number) => {
    setMonthRef(moment({year, month: monthIndex0Based, date: 1}));
  }, []);

  const {width: screenWidth} = useWindowDimensions();
  const tileWidth = Math.floor(
    (screenWidth - PADDING_H * 2 - CELL_GAP * (COLUMNS - 1)) / COLUMNS,
  );
  const rows = useMemo(() => {
    const out: CalendarDayDTO[][] = [];
    for (let i = 0; i < daysFlat.length; i += COLUMNS) {
      out.push(daysFlat.slice(i, i + COLUMNS));
    }
    return out;
  }, [daysFlat]);

  return {
    monthRef,
    monthLabel: formatToFirstLetterUppercase(monthRef.format('MMMM [de] YYYY')),
    matrix,
    daysFlat,
    isLoading,
    goPrevMonth,
    goNextMonth,
    setMonth,
    tileWidth,
    rows,
    COLUMNS,
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    onPressDay,
    selectedDayItem,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditingModalOpen,
    setIsEditingModalOpen,
    selectedRegisterItem,
    setSelectedRegisterItem,
    onEditRegister,
    onDeleteRegister,
    isDeletingModalOpen,
    setIsDeletingModalOpen,
    findRegisterIndex,
  };
}
