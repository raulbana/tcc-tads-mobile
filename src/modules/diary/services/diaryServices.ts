import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {
  CalendarRangeResponse,
  CalendarRequestDTO,
  CalendarDayDTO,
  UrinationDataDTO,
  ReportDTO,
} from '../../../types/diary';
import {MMKVStorage, DIARY_CALENDAR_KEY} from '../../../storage/mmkvStorage';

const api = apiFactory(BASE_URL);

const transformTimeFormat = (time: string): string => {
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return time;
  }
  if (/^\d{2}:\d{2}$/.test(time)) {
    return `${time}:00`;
  }
  return time;
};

export const formatTimeToShort = (time: string): string => {
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return time.substring(0, 5);
  }
  return time;
};

const transformUrinationData = (
  urinationData: UrinationDataDTO[],
): UrinationDataDTO[] => {
  return urinationData.map(data => ({
    ...data,
    time: transformTimeFormat(data.time),
  }));
};

const diaryServices = {
  getCalendarEvents: async (
    from?: string,
    to?: string,
    userId?: string,
  ): Promise<CalendarRangeResponse> => {
    if (!userId) {
      const cachedData = MMKVStorage.getString(DIARY_CALENDAR_KEY);
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData) as CalendarRangeResponse;
          return parsedData;
        } catch (error) {
          console.error(
            'Erro ao fazer parse dos dados do calendário do MMKV:',
            error,
          );
        }
      }
      return {};
    }

    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const headers: Record<string, string> = {};
    headers['user-id'] = userId;

    const queryString = params.toString();
    const url = `${apiRoutes.diary.calendar}${
      queryString ? `?${queryString}` : ''
    }`;

    const res = await api.get(url, {headers});
    return res.data as CalendarRangeResponse;
  },

  setCalendarEvent: async (
    data: CalendarRequestDTO,
    userId?: string,
  ): Promise<CalendarDayDTO> => {
    if (!userId) {
      const cachedData = MMKVStorage.getString(DIARY_CALENDAR_KEY);
      let calendarData: CalendarRangeResponse = {};

      if (cachedData) {
        try {
          calendarData = JSON.parse(cachedData) as CalendarRangeResponse;
        } catch (error) {
          console.error(
            'Erro ao fazer parse dos dados do calendário do MMKV:',
            error,
          );
        }
      }

      const calendarDay: CalendarDayDTO = {
        date: data.date,
        leakageLevel: data.leakageLevel,
        eventsCount: 1,
        completedExercises: 0,
        notesPreview: data.notesPreview,
        urinationData: data.urinationData || [],
        dayTitle: new Date(data.date).toLocaleDateString('pt-BR', {
          weekday: 'long',
        }),
        dayNumber: new Date(data.date).getDate(),
        isToday:
          new Date(data.date).toDateString() === new Date().toDateString(),
        today: new Date(data.date).toDateString() === new Date().toDateString(),
      };

      calendarData[data.date] = calendarDay;
      MMKVStorage.set(DIARY_CALENDAR_KEY, JSON.stringify(calendarData));

      return calendarDay;
    }

    const transformedData = {
      ...data,
      urinationData: data.urinationData
        ? transformUrinationData(data.urinationData)
        : undefined,
    };

    const res = await api.put(apiRoutes.diary.calendar, transformedData, {
      headers: {'user-id': userId},
    });
    return res.data as CalendarDayDTO;
  },

  syncOfflineData: async (userId: string): Promise<void> => {
    const cachedData = MMKVStorage.getString(DIARY_CALENDAR_KEY);
    if (!cachedData) return;

    try {
      const calendarData = JSON.parse(cachedData) as CalendarRangeResponse;

      for (const [_date, dayData] of Object.entries(calendarData)) {
        const requestData: CalendarRequestDTO = {
          date: dayData.date,
          leakageLevel: dayData.leakageLevel,
          notesPreview: dayData.notesPreview,
          urinationData: dayData.urinationData
            ? transformUrinationData(dayData.urinationData)
            : undefined,
        };

        await api.put(apiRoutes.diary.calendar, requestData, {
          headers: {'x-user-id': userId},
        });
      }

      MMKVStorage.delete(DIARY_CALENDAR_KEY);
    } catch (error) {
      console.error('Erro ao sincronizar dados do calendário:', error);
      throw error;
    }
  },

  getReport: async (
    from: string,
    to: string,
    userId?: string,
  ): Promise<ReportDTO> => {
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    const params = new URLSearchParams();
    params.append('from', from);
    params.append('to', to);

    const url = `${apiRoutes.diary.report}?${params.toString()}`;
    const res = await api.get(url, {headers: {'x-user-id': userId}});
    return res.data as ReportDTO;
  },
};

export default diaryServices;
