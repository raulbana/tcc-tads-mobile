import { useQuery, QueryKey } from '@tanstack/react-query';
import { Question } from '../../../types/question';
import onboardingServices from '../services/onboardingServices';

function findQuestionById(id: string, questions: Question[]): Question | undefined {
  return questions.find(q => q.id === id);
}

export const onboardingQueryFactory = (queryKey: QueryKey) => {
  return {
    getQuestions: () => useQuery<Question[]>({
      queryKey: [...queryKey],
      queryFn: () => onboardingServices.getQuestions(),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
      select: (data: Question[]) => data.map((question) => ({
        ...question,
      })),
    }),
    getQuestionById: (id: string) => useQuery<Question | undefined>({
      queryKey: [...queryKey, 'questions'],
      queryFn: () => onboardingServices.getQuestions(),
      staleTime: 1000 * 60 * 5,
      select: (questions: Question[]) => findQuestionById(id, questions),
    }),
  };
};

const useOnboardingQueries = (queryKey: QueryKey) => {
  const queries = onboardingQueryFactory(queryKey);
  return {
    ...queries
  };
};

export default useOnboardingQueries;
