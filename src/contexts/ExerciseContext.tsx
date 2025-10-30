import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {useAuth} from './AuthContext';
import useExerciseQueries from '../modules/exercises/services/exerciseQueryFactory';
import {
  Workout,
  WorkoutPlan,
  UserWorkoutFeedbackDTO,
  UserWorkoutCompletionDTO,
} from '../types/exercise';

interface ExerciseContextType {
  workouts: Workout[];
  workoutPlan: WorkoutPlan[];
  isLoading: boolean;
  error: string | null;
  loadWorkouts: () => Promise<void>;
  loadUserWorkoutPlan: () => Promise<void>;
  submitWorkoutFeedback: (data: UserWorkoutFeedbackDTO) => Promise<void>;
  submitWorkoutCompletion: (data: UserWorkoutCompletionDTO) => Promise<void>;
  getWorkoutById: (id: string) => Promise<Workout | undefined>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

export const ExerciseProvider = ({children}: {children: ReactNode}) => {
  const {user} = useAuth();
  const exerciseQueries = useExerciseQueries(['exercises']);

  const {
    data: workouts = [],
    isLoading: isLoadingWorkouts,
    error: workoutsError,
    refetch: refetchWorkouts,
  } = exerciseQueries.listWorkouts();

  const {
    data: workoutPlan = [],
    isLoading: isLoadingPlan,
    error: planError,
    refetch: refetchPlan,
  } = exerciseQueries.listWorkoutPlans();

  const feedbackMutation = exerciseQueries.submitWorkoutFeedback();
  const completionMutation = exerciseQueries.submitWorkoutCompletion();

  const isLoading = isLoadingWorkouts || isLoadingPlan;
  const error = workoutsError?.message || planError?.message || null;

  const loadWorkouts = useCallback(async () => {
    await refetchWorkouts();
  }, [refetchWorkouts]);

  const loadUserWorkoutPlan = useCallback(async () => {
    await refetchPlan();
  }, [refetchPlan]);

  const submitWorkoutFeedback = useCallback(
    async (data: UserWorkoutFeedbackDTO) => {
      await feedbackMutation.mutateAsync(data);
    },
    [feedbackMutation],
  );

  const submitWorkoutCompletion = useCallback(
    async (data: UserWorkoutCompletionDTO) => {
      await completionMutation.mutateAsync(data);
    },
    [completionMutation],
  );

  const getWorkoutById = useCallback(
    async (id: string) => {
      return workouts.find(w => w.id === id);
    },
    [workouts],
  );

  const value = useMemo(
    () => ({
      workouts,
      workoutPlan,
      isLoading,
      error,
      loadWorkouts,
      loadUserWorkoutPlan,
      submitWorkoutFeedback,
      submitWorkoutCompletion,
      getWorkoutById,
    }),
    [
      workouts,
      workoutPlan,
      isLoading,
      error,
      loadWorkouts,
      loadUserWorkoutPlan,
      submitWorkoutFeedback,
      submitWorkoutCompletion,
      getWorkoutById,
    ],
  );

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = (): ExerciseContextType => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};
