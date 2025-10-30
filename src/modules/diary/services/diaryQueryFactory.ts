import {useQuery, useMutation, QueryKey} from '@tanstack/react-query';
import {
  CalendarRangeResponse,
  CalendarRequestDTO,
  CalendarDayDTO,
} from '../../../types/diary';
import diaryServices from './diaryServices';

export const diaryQueryFactory = (queryKey: QueryKey) => {
  return {
    useGetCalendarEvents: (from?: string, to?: string, userId?: string) =>
      useQuery<CalendarRangeResponse>({
        queryKey: [...queryKey, 'calendar-events', from, to, userId],
        queryFn: () => diaryServices.getCalendarEvents(from, to, userId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    useSetCalendarEvent: (userId?: string) =>
      useMutation<CalendarDayDTO, Error, CalendarRequestDTO>({
        mutationFn: (data: CalendarRequestDTO) =>
          diaryServices.setCalendarEvent(data, userId),
      }),

    useGenerateReport: (userId?: string) =>
      useMutation<any, Error, {from: string; to: string}>({
        mutationFn: ({from, to}) => diaryServices.getReport(from, to, userId),
      }),
  };
};

const useDiaryQueries = (queryKey: QueryKey) => {
  const queries = diaryQueryFactory(queryKey);
  return {
    ...queries,
  };
};

export default useDiaryQueries;
