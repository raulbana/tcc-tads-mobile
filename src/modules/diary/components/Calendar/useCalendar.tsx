import {useMemo, useState, useCallback, useEffect, useRef} from 'react';
import moment, {Moment} from 'moment';
import {
  CalendarDayDTO,
  LeakageLevel,
  UrinationDataDTO,
} from '../../../../types/diary';
import {
  buildMonthMatrix,
  formatToFirstLetterUppercase,
} from '../../../../utils/calendarUtils';
import {useDiary} from '../../../../contexts/DiaryContext';
import {useAuth} from '../../../../contexts/AuthContext';
import diaryServices from '../../../../modules/diary/services/diaryServices';
import {useWindowDimensions} from 'react-native';
import {horizontalScale} from '../../../../utils/scales';

export function useCalendar(initialSelectedDate?: string) {
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

  const {calendarData, isLoading, setCalendarData} = useDiary();
  const {user, isLoggedIn} = useAuth();

  const authRef = useRef({user, isLoggedIn});
  authRef.current = {user, isLoggedIn};

  const loadMonthData = useCallback(
    async (month: Moment) => {
      const startOfMonth = month.clone().startOf('month');
      const endOfMonth = month.clone().endOf('month');

      try {
        const userId = authRef.current.isLoggedIn
          ? authRef.current.user?.id?.toString()
          : undefined;
        const data = await diaryServices.getCalendarEvents(
          startOfMonth.format('YYYY-MM-DD'),
          endOfMonth.format('YYYY-MM-DD'),
          userId,
        );

        setCalendarData(prevData => ({
          ...prevData,
          ...data,
        }));
      } catch (err) {
        console.error('Erro ao carregar eventos do calendário:', err);
      }
    },
    [setCalendarData],
  );

  useEffect(() => {
    loadMonthData(monthRef);
  }, [monthRef, loadMonthData]);

  const goPrevMonth = useCallback(() => {
    const newMonth = monthRef.clone().subtract(1, 'month');
    setMonthRef(newMonth);
  }, [monthRef]);

  const goNextMonth = useCallback(() => {
    const newMonth = monthRef.clone().add(1, 'month');
    setMonthRef(newMonth);
  }, [monthRef]);

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

  const setMonth = useCallback((year: number, monthIndex0Based: number) => {
    const newMonth = moment({year, month: monthIndex0Based, date: 1});
    setMonthRef(newMonth);
  }, []);

  const processedInitialDateRef = useRef<string | null>(null);
  const isChangingMonthRef = useRef(false);

  useEffect(() => {
    if (!initialSelectedDate || daysFlat.length === 0) {
      return;
    }

    if (processedInitialDateRef.current === initialSelectedDate) {
      if (isChangingMonthRef.current) {
        const selectedDay = daysFlat.find(
          day => day.date === initialSelectedDate,
        );
        if (selectedDay) {
          setSelectedDayItem(selectedDay);
          setIsRegisterModalOpen(true);
          isChangingMonthRef.current = false;
        }
      }
      return;
    }

    const dateMoment = moment(initialSelectedDate);
    const selectedDay = daysFlat.find(day => day.date === initialSelectedDate);

    if (!selectedDay) {
      const currentMonth = monthRef.month();
      const currentYear = monthRef.year();
      const targetMonth = dateMoment.month();
      const targetYear = dateMoment.year();

      if (currentMonth !== targetMonth || currentYear !== targetYear) {
        processedInitialDateRef.current = initialSelectedDate;
        isChangingMonthRef.current = true;
        setMonth(targetYear, targetMonth);
      }
    } else {
      setSelectedDayItem(selectedDay);
      setIsRegisterModalOpen(true);
      processedInitialDateRef.current = initialSelectedDate;
      isChangingMonthRef.current = false;
    }
  }, [initialSelectedDate, daysFlat, monthRef, setMonth]);

  useEffect(() => {
    if (!initialSelectedDate) {
      processedInitialDateRef.current = null;
      isChangingMonthRef.current = false;
    }
  }, [initialSelectedDate]);

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
