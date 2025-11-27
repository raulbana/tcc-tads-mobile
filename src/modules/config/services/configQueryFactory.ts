import {QueryKey, useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
  ContactRequest,
  ContactResponse,
  AccessibilityPreferences,
  EditProfileRequest,
  EditProfileResponse,
} from '../../../types/config';
import configServices from './configServices';

export const configQueryFactory = (baseKey: QueryKey) => {
  const queryClient = useQueryClient();

  return {
    useGetAccessibilityPreferences: (userId: number) =>
      useQuery<AccessibilityPreferences>({
        queryKey: [...baseKey, 'accessibility-preferences', userId],
        queryFn: () => configServices.getAccessibilityPreferences(userId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!userId,
      }),

    useUpdateAccessibilityPreferences: () =>
      useMutation<
        AccessibilityPreferences,
        Error,
        {userId: number; preferences: AccessibilityPreferences}
      >({
        mutationFn: ({userId, preferences}) =>
          configServices.updateAccessibilityPreferences(userId, preferences),
      }),

    useSendContactEmail: () =>
      useMutation<ContactResponse, Error, ContactRequest>({
        mutationFn: (data: ContactRequest) =>
          configServices.sendContactEmail(data),
      }),

    editProfile: () =>
      useMutation<
        EditProfileResponse,
        Error,
        {userId: number; data: EditProfileRequest; profilePictureUri?: string}
      >({
        mutationFn: ({userId, data, profilePictureUri}) =>
          configServices.editProfile(userId, data, profilePictureUri),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'user'],
          });
        },
      }),
  };
};

const useConfigQueries = (queryKey: QueryKey) => {
  const queries = configQueryFactory(queryKey);
  return {
    ...queries,
  };
};

export default useConfigQueries;
