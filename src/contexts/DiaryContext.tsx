import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import {
  CalendarDayDTO,
  CalendarRequestDTO,
  CalendarRangeResponse,
  UrinationDataDTO,
} from '../types/diary';
import diaryServices from '../modules/diary/services/diaryServices';
import {useAuth} from './AuthContext';

interface DiaryContextType {
  calendarData: CalendarRangeResponse | null;
  isLoading: boolean;
  error: string | null;

  loadCalendarEvents: (from?: string, to?: string) => Promise<void>;
  saveCalendarEvent: (data: CalendarRequestDTO) => Promise<CalendarDayDTO>;
  updateCalendarData: (date: string, dayData: CalendarDayDTO) => void;
  addUrinationData: (
    date: string,
    urinationData: UrinationDataDTO,
  ) => Promise<void>;
  editUrinationData: (
    date: string,
    index: number,
    urinationData: UrinationDataDTO,
  ) => Promise<void>;
  deleteUrinationData: (date: string, index: number) => Promise<void>;
  updateLeakageLevel: (date: string, level: string) => Promise<void>;
  updateNotes: (date: string, notes: string) => Promise<void>;

  clearError: () => void;
  getDayData: (date: string) => CalendarDayDTO | null;
  setCalendarData: (
    data:
      | CalendarRangeResponse
      | null
      | ((prev: CalendarRangeResponse | null) => CalendarRangeResponse | null),
  ) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider = ({children}: {children: ReactNode}) => {
  const [calendarData, setCalendarData] =
    useState<CalendarRangeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {user, isLoggedIn} = useAuth();

  const authRef = useRef({user, isLoggedIn});
  authRef.current = {user, isLoggedIn};

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const calculateLeakageLevel = useCallback(
    (urinationData: UrinationDataDTO[]): string => {
      if (!urinationData || urinationData.length === 0) {
        return 'NONE';
      }

      const leakageCount = urinationData.filter(item => item.leakage).length;
      const totalCount = urinationData.length;
      const leakagePercentage = (leakageCount / totalCount) * 100;

      if (leakagePercentage === 0) return 'NONE';
      if (leakagePercentage <= 25) return 'LOW';
      if (leakagePercentage <= 75) return 'MEDIUM';
      return 'HIGH';
    },
    [],
  );

  const loadCalendarEvents = useCallback(
    async (from?: string, to?: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const userId = authRef.current.isLoggedIn
          ? authRef.current.user?.id?.toString()
          : undefined;
        const data = await diaryServices.getCalendarEvents(from, to, userId);
        setCalendarData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar eventos do calendário';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const saveCalendarEvent = useCallback(
    async (data: CalendarRequestDTO): Promise<CalendarDayDTO> => {
      try {
        setIsLoading(true);
        setError(null);

        const userId = isLoggedIn ? user?.id?.toString() : undefined;
        const result = await diaryServices.setCalendarEvent(data, userId);

        setCalendarData(prev => ({
          ...prev,
          [data.date]: result,
        }));

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao salvar evento';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggedIn, user?.id],
  );

  const updateCalendarData = useCallback(
    (date: string, dayData: CalendarDayDTO) => {
      setCalendarData(prev => ({
        ...prev,
        [date]: dayData,
      }));
    },
    [],
  );

  const addUrinationData = useCallback(
    async (date: string, urinationData: UrinationDataDTO) => {
      try {
        setIsLoading(true);
        setError(null);

        const currentDay = calendarData?.[date];

        const updatedUrinationData = [
          ...(currentDay?.urinationData || []),
          urinationData,
        ];
        const updatedDay = {
          ...(currentDay || {}),
          urinationData: updatedUrinationData,
          eventsCount: (currentDay?.eventsCount || 0) + 1,
        };

        const newLeakageLevel = calculateLeakageLevel(updatedUrinationData);

        const userId = isLoggedIn ? user?.id?.toString() : undefined;
        const result = await diaryServices.setCalendarEvent(
          {
            date,
            leakageLevel: newLeakageLevel,
            notesPreview: updatedDay?.notesPreview || '',
            urinationData: updatedUrinationData,
          },
          typeof userId === 'number' ? String(userId) : userId,
        );

        setCalendarData(prev => ({
          ...prev,
          [date]: result,
        }));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao adicionar registro';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [calendarData, calculateLeakageLevel, isLoggedIn, user?.id],
  );

  const editUrinationData = useCallback(
    async (date: string, index: number, urinationData: UrinationDataDTO) => {
      try {
        setIsLoading(true);
        setError(null);

        const currentDay = calendarData?.[date];
        if (!currentDay) {
          throw new Error('Dia não encontrado');
        }

        const updatedUrinationData = [...currentDay.urinationData];
        updatedUrinationData[index] = urinationData;

        const newLeakageLevel = calculateLeakageLevel(updatedUrinationData);

        const userId = isLoggedIn ? user?.id?.toString() : undefined;
        const result = await diaryServices.setCalendarEvent(
          {
            date,
            leakageLevel: newLeakageLevel,
            notesPreview: currentDay.notesPreview,
            urinationData: updatedUrinationData,
          },
          typeof userId === 'number' ? String(userId) : userId,
        );

        setCalendarData(prev => ({
          ...prev,
          [date]: result,
        }));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao editar registro';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [calendarData, calculateLeakageLevel, isLoggedIn, user?.id],
  );

  const deleteUrinationData = useCallback(
    async (date: string, index: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const currentDay = calendarData?.[date];
        if (!currentDay) {
          throw new Error('Dia não encontrado');
        }

        const updatedUrinationData = currentDay.urinationData.filter(
          (_, i) => i !== index,
        );

        const updatedDay = {
          ...currentDay,
          urinationData: updatedUrinationData,
          eventsCount: Math.max(0, currentDay.eventsCount - 1),
        };

        const userId = isLoggedIn ? user?.id?.toString() : undefined;
        const result = await diaryServices.setCalendarEvent(
          {
            date,
            leakageLevel: updatedDay.leakageLevel,
            notesPreview: updatedDay.notesPreview,
            urinationData: updatedDay.urinationData,
          },
          typeof userId === 'number' ? String(userId) : userId,
        );

        setCalendarData(prev => ({
          ...prev,
          [date]: result,
        }));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao deletar registro';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [calendarData, isLoggedIn, user?.id],
  );

  const updateLeakageLevel = useCallback(
    async (date: string, level: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const currentDay = calendarData?.[date];
        if (!currentDay) {
          throw new Error('Dia não encontrado');
        }

        const updatedDay = {
          ...currentDay,
          leakageLevel: level,
        };

        const userId = isLoggedIn ? user?.id?.toString() : undefined;
        const result = await diaryServices.setCalendarEvent(
          {
            date,
            leakageLevel: level,
            notesPreview: updatedDay.notesPreview,
            urinationData: updatedDay.urinationData,
          },
          typeof userId === 'number' ? String(userId) : userId,
        );

        setCalendarData(prev => ({
          ...prev,
          [date]: result,
        }));
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao atualizar nível de vazamento';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [calendarData, isLoggedIn, user?.id],
  );

  const updateNotes = useCallback(
    async (date: string, notes: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const currentDay = calendarData?.[date];
        if (!currentDay) {
          throw new Error('Dia não encontrado');
        }

        const updatedDay = {
          ...currentDay,
          notesPreview: notes,
        };

        const userId = isLoggedIn ? user?.id?.toString() : undefined;
        const result = await diaryServices.setCalendarEvent(
          {
            date,
            leakageLevel: updatedDay.leakageLevel,
            notesPreview: notes,
            urinationData: updatedDay.urinationData,
          },
          typeof userId === 'number' ? String(userId) : userId,
        );

        setCalendarData(prev => ({
          ...prev,
          [date]: result,
        }));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao atualizar notas';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [calendarData, isLoggedIn, user?.id],
  );

  const getDayData = useCallback(
    (date: string): CalendarDayDTO | null => {
      return calendarData?.[date] || null;
    },
    [calendarData, isLoggedIn, user?.id],
  );

  return (
    <DiaryContext.Provider
      value={{
        calendarData,
        isLoading,
        error,
        loadCalendarEvents,
        saveCalendarEvent,
        updateCalendarData,
        addUrinationData,
        editUrinationData,
        deleteUrinationData,
        updateLeakageLevel,
        updateNotes,
        clearError,
        getDayData,
        setCalendarData,
      }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = (): DiaryContextType => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};
