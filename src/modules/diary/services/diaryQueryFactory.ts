import {useQuery, QueryKey} from '@tanstack/react-query';
import {CalendarRangeResponse} from '../../../types/diary';
import diaryServices from './diaryServices';

export const diaryQueryFactory = (queryKey: QueryKey) => {
  return {
    getByRange: (from: Date, to: Date) =>
      useQuery<CalendarRangeResponse>({
        queryKey: [...queryKey, 'calendar-range', from.toISOString(), to.toISOString()],
        queryFn: () => diaryServices.getByRange(from, to),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),
    getCurrentMonth: () =>
      useQuery<CalendarRangeResponse>({
        queryKey: [...queryKey, 'calendar-current-month'],
        queryFn: () => diaryServices.getCurrentMonth(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
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