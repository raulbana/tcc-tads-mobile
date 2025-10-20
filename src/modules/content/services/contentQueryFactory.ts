import {QueryKey, useQuery} from '@tanstack/react-query';
import contentServices from './contentServices';

export const contentQueryFactory = (baseKey: QueryKey) => {
  return {
    getById: (contentId: string) =>
      useQuery({
        queryKey: [...baseKey, 'contentDetails', contentId],
        queryFn: () => contentServices.getById(contentId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    getList: (profileMode?: boolean) =>
      useQuery({
        queryKey: [...baseKey, 'contentList', profileMode],
        queryFn: () => contentServices.getAll(profileMode),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    getCategories: () =>
      useQuery({
        queryKey: [...baseKey, 'contentCategories'],
        queryFn: () => contentServices.getCategories(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        refetchOnWindowFocus: false,
      }),
  };
};

const useContentQueries = (queryKey: QueryKey) => {
  const queries = contentQueryFactory(queryKey);
  return {
    ...queries,
  };
};

export default useContentQueries;
