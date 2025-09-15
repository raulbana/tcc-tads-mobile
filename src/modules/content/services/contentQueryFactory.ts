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

    getList: () =>
      useQuery({
        queryKey: [...baseKey, 'contentList'],
        queryFn: () => contentServices.getAll(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    getCategories: () =>
      useQuery({
        queryKey: [...baseKey, 'contentCategoryList'],
        queryFn: () => contentServices.getCategories(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
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
