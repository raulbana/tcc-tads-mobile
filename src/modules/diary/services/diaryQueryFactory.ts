import {useQuery, useMutation, QueryKey} from '@tanstack/react-query';
import {CalendarRangeResponse, CalendarRequestDTO, CalendarDayDTO} from '../../../types/diary';
import diaryServices from './diaryServices';

export const diaryQueryFactory = (queryKey: QueryKey) => {
  return {
    useGetCalendarEvents: (from?: string, to?: string) =>
      useQuery<CalendarRangeResponse>({
        queryKey: [...queryKey, 'calendar-events', from, to],
        queryFn: () => diaryServices.getCalendarEvents(from, to),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    useSetCalendarEvent: () =>
      useMutation<CalendarDayDTO, Error, CalendarRequestDTO>({
        mutationFn: (data: CalendarRequestDTO) => diaryServices.setCalendarEvent(data),
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