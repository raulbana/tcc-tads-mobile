import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import useExerciseQueries from '../modules/exercises/services/exerciseQueryFactory';
import {
  Workout,
  WorkoutPlan,
  ExerciseFeedbackCreatorDTO,
  WorkoutCompletionDTO,
} from '../types/exercise';
import {useAuth} from './AuthContext';

interface ExerciseContextType {
  workouts: Workout[];
  workoutPlan: WorkoutPlan | null;
  isLoading: boolean;
  error: string | null;
  loadUserWorkoutPlan: () => Promise<void>;
  submitWorkoutFeedback: (data: ExerciseFeedbackCreatorDTO[]) => Promise<void>;
  submitWorkoutCompletion: (data: WorkoutCompletionDTO[]) => Promise<void>;
  getWorkoutById: (id: string) => Workout | undefined;
  checkUserWorkoutPlan: () => Promise<void>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

export const ExerciseProvider = ({children}: {children: ReactNode}) => {
  const {isLoggedIn} = useAuth();
  const exerciseQueries = useExerciseQueries(['exercises'], isLoggedIn);

  const feedbackMutation = exerciseQueries.submitWorkoutFeedback();
  const completionMutation = exerciseQueries.submitWorkoutCompletion();

  const {
    data: userWorkoutPlan,
    isLoading,
    error: userWorkoutPlanError,
    refetch: refetchUserWorkoutPlan,
  } = exerciseQueries.getUserWorkoutPlan();

  const workouts = useMemo<Workout[]>(() => {
    return userWorkoutPlan?.workouts || [];
  }, [userWorkoutPlan]);

  const workoutPlan = useMemo<WorkoutPlan | null>(() => {
    return userWorkoutPlan?.plan || null;
  }, [userWorkoutPlan]);

  const error = userWorkoutPlanError?.message || null;

  const loadUserWorkoutPlan = useCallback(async () => {
    await refetchUserWorkoutPlan();
  }, [refetchUserWorkoutPlan]);

  const submitWorkoutFeedback = useCallback(
    async (data: ExerciseFeedbackCreatorDTO[]) => {
      await feedbackMutation.mutateAsync(data);
    },
    [feedbackMutation],
  );

  const submitWorkoutCompletion = useCallback(
    async (data: WorkoutCompletionDTO[]) => {
      await completionMutation.mutateAsync(data);
    },
    [completionMutation],
  );

  const getWorkoutById = useCallback(
    (id: string) => {
      return workouts.find(w => w.id === id);
    },
    [workouts],
  );

  const checkUserWorkoutPlan = useCallback(async () => {
    try {
      const result = await refetchUserWorkoutPlan();

      // Verificar se há erro na query
      if (result.error) {
        console.error('Error fetching user workout plan:', result.error);
        throw new Error('Erro ao verificar plano de treino. Tente novamente.');
      }

      // Verificar se os dados existem e se há um plano válido
      if (!result.data) {
        throw new Error(
          'Usuário não possui um plano de treino ativo. Por favor, complete o onboarding para iniciar um plano de treino.',
        );
      }

      // Se chegou aqui, há um plano válido
    } catch (error) {
      // Se for um erro que já foi lançado, re-lançar
      if (error instanceof Error && error.message.includes('plano de treino')) {
        throw error;
      }
      // Para outros erros, lançar erro genérico
      throw new Error('Erro ao verificar plano de treino. Tente novamente.');
    }
  }, [refetchUserWorkoutPlan]);

  const value = useMemo(
    () => ({
      workouts,
      workoutPlan,
      isLoading,
      error,
      loadUserWorkoutPlan,
      submitWorkoutFeedback,
      submitWorkoutCompletion,
      getWorkoutById,
      checkUserWorkoutPlan,
    }),
    [
      workouts,
      workoutPlan,
      isLoading,
      error,
      loadUserWorkoutPlan,
      submitWorkoutFeedback,
      submitWorkoutCompletion,
      getWorkoutById,
      checkUserWorkoutPlan,
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
