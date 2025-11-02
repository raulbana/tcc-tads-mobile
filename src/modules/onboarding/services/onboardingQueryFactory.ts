import onboardingServices from '../services/onboardingServices';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from '@tanstack/react-query';
import {Question} from '../../../types/question';
import {OnboardSubmitDTO, OnboardCompleteDTO} from '../../../types/onboarding';

const useOnboardingQueries = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return {
    getQuestions: () =>
      useQuery<Question[]>({
        queryKey: [...queryKey, 'list'],
        queryFn: () => onboardingServices.getQuestions(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),
    submitAnswers: () =>
      useMutation<OnboardCompleteDTO, Error, OnboardSubmitDTO>({
        mutationFn: (data: OnboardSubmitDTO) =>
          onboardingServices.submitAnswers(data),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey});
        },
      }),
  };
};

export default useOnboardingQueries;
