import {QueryKey, useQuery, useMutation} from '@tanstack/react-query';
import {Content} from '../../../../types/content';
import {contentServices} from '../../../content';

export const profileQueryFactory = (baseKey: QueryKey) => {
  return {
    useGetUserContent: (userId: string) =>
      useQuery<Content[]>({
        queryKey: [...baseKey, 'user-content', userId],
        queryFn: () => contentServices.getUserContent(userId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!userId,
      }),

    useGetSavedContent: (userId: string) =>
      useQuery<Content[]>({
        queryKey: [...baseKey, 'saved-content', userId],
        queryFn: () => contentServices.getSavedContent(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!userId,
      }),

    useDeleteContent: () =>
      useMutation<void, Error, string>({
        mutationFn: (contentId: string) =>
          contentServices.deleteContent(contentId),
      }),

    useUnsaveContent: () =>
      useMutation<void, Error, string>({
        mutationFn: (contentId: string) =>
          contentServices.unsaveContent(contentId),
      }),
  };
};

const useProfileQueries = (queryKey: QueryKey) => {
  const queries = profileQueryFactory(queryKey);
  return {
    ...queries,
  };
};

export default useProfileQueries;
