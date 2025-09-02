import onboardingServices from '../services/onboardingServices';
import { useQuery, QueryKey } from '@tanstack/react-query';
import { Question } from '../../../types/question';

export const onboardingQueryFactory = (queryKey: QueryKey) => {
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
  };
};

const useOnboardingQueries = (queryKey: QueryKey) => {
  const queries = onboardingQueryFactory(queryKey);
  return { ...queries };
};

export default useOnboardingQueries;