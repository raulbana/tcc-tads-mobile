import {QueryKey, useMutation, useQuery} from '@tanstack/react-query';
import exerciseServices from './exerciseServices';
import {
  Exercise,
  Workout,
  WorkoutPlan,
  UserWorkoutPlanDTO,
} from '../../../types/exercise';

export const exerciseQueryFactory = (
  baseKey: QueryKey,
  isLoggedIn?: boolean,
) => {
  return {
    listExercises: () =>
      useQuery<Exercise[]>({
        queryKey: [...baseKey, 'exercises'],
        queryFn: () => exerciseServices.listExercises(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    getExerciseById: (id: string) =>
      useQuery<Exercise>({
        queryKey: [...baseKey, 'exercise', id],
        queryFn: () => exerciseServices.getExerciseById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    listWorkouts: () =>
      useQuery<Workout[]>({
        queryKey: [...baseKey, 'workouts'],
        queryFn: () => exerciseServices.listWorkouts(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    getWorkoutById: (id: string) =>
      useQuery<Workout>({
        queryKey: [...baseKey, 'workout', id],
        queryFn: () => exerciseServices.getWorkoutById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    listWorkoutPlans: () =>
      useQuery<WorkoutPlan[]>({
        queryKey: [...baseKey, 'workoutPlans'],
        queryFn: () => exerciseServices.listWorkoutPlans(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    getWorkoutPlanById: (id: string) =>
      useQuery<WorkoutPlan>({
        queryKey: [...baseKey, 'workoutPlan', id],
        queryFn: () => exerciseServices.getWorkoutPlanById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    submitWorkoutFeedback: () =>
      useMutation<
        void,
        Error,
        import('../../../types/exercise').ExerciseFeedbackCreatorDTO[]
      >({
        mutationFn: payload => exerciseServices.submitWorkoutFeedback(payload),
      }),

    submitWorkoutCompletion: () =>
      useMutation<
        void,
        Error,
        import('../../../types/exercise').WorkoutCompletionDTO[]
      >({
        mutationFn: payload =>
          exerciseServices.submitWorkoutCompletion(payload),
      }),

    getUserWorkoutPlan: () =>
      useQuery<UserWorkoutPlanDTO | null>({
        queryKey: [...baseKey, 'userWorkoutPlan'],
        queryFn: () => exerciseServices.getUserWorkoutPlan(),
        enabled: isLoggedIn ?? false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      }),
  };
};

const useExerciseQueries = (queryKey: QueryKey, isLoggedIn?: boolean) => {
  const queries = exerciseQueryFactory(queryKey, isLoggedIn);
  return {
    ...queries,
  };
};

export default useExerciseQueries;
