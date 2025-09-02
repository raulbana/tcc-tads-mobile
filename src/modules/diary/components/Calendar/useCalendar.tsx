import {useMemo, useState, useCallback, useEffect} from 'react';
import moment, {Moment} from 'moment';
import {
  CalendarDayData,
  LeakageLevel,
  UrinationData,
} from '../../../../types/diary';
import {
  buildMonthMatrix,
  formatToFirstLetterUppercase,
  getMonthIsoRange,
} from '../../../../utils/calendarUtils';
import useDiaryQueries from '../../services/diaryQueryFactory';
import {useWindowDimensions} from 'react-native';
import {horizontalScale} from '../../../../utils/scales';

export function useCalendar() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);

  const [selectedRegisterItem, setSelectedRegisterItem] =
    useState<UrinationData | null>(null);

  const [selectedDayItem, setSelectedDayItem] =
    useState<CalendarDayData | null>(null);

  const onPressDay = useCallback((dayItem: CalendarDayData) => {
    setSelectedDayItem(dayItem);
    setIsRegisterModalOpen(true);
  }, []);

  const COLUMNS = 6;
  const CELL_GAP = horizontalScale(8);
  const PADDING_H = horizontalScale(16);

  const [monthRef, setMonthRef] = useState<Moment>(moment());

  const matrix = useMemo(() => buildMonthMatrix(monthRef), [monthRef]);

  const {from, to} = useMemo(() => getMonthIsoRange(monthRef), [monthRef]);

  const diaryQueries = useDiaryQueries(['calendar-range', from, to]);
  const {data, isLoading, refetch} = diaryQueries.getByRange(
    new Date(from),
    new Date(to),
  );

  const onEditRegister = useCallback(
    (register: UrinationData) => {
      setIsRegisterModalOpen(false);
      setSelectedRegisterItem(register);
      setIsEditingModalOpen(true);
    },
    [selectedDayItem, selectedRegisterItem],
  );

  const daysFlat: CalendarDayData[] = useMemo(() => {
    const backendMap: Record<string, CalendarDayData> = data ?? {};

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
        dayTitle: formatToFirstLetterUppercase(cell.date.format('ddd')),
        dayNumber: Number(cell.date.format('D')),
        date: cell.date.toDate(),
        isToday: cell.isToday,
        level,
      };
    });
  }, [matrix, data, monthRef]);

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
    const out: CalendarDayData[][] = [];
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
    refetch,
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
  };
}
