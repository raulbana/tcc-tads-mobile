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
  workoutPlan: WorkoutPlan[];
  isLoading: boolean;
  error: string | null;
  loadWorkouts: () => Promise<void>;
  loadUserWorkoutPlan: () => Promise<void>;
  submitWorkoutFeedback: (data: ExerciseFeedbackCreatorDTO[]) => Promise<void>;
  submitWorkoutCompletion: (data: WorkoutCompletionDTO[]) => Promise<void>;
  getWorkoutById: (id: string) => Promise<Workout | undefined>;
  checkUserWorkoutPlan: () => Promise<void>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

export const ExerciseProvider = ({children}: {children: ReactNode}) => {
  const {isLoggedIn} = useAuth();
  const exerciseQueries = useExerciseQueries(['exercises'], isLoggedIn);

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

  const {
    refetch: refetchUserWorkoutPlan,
  } = exerciseQueries.getUserWorkoutPlan();

  const isLoading = isLoadingWorkouts || isLoadingPlan;
  const error = workoutsError?.message || planError?.message || null;

  const loadWorkouts = useCallback(async () => {
    await refetchWorkouts();
  }, [refetchWorkouts]);

  const loadUserWorkoutPlan = useCallback(async () => {
    await refetchPlan();
  }, [refetchPlan]);

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
    async (id: string) => {
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
        // Verificar também se há workouts disponíveis (pode indicar que há plano mesmo sem resposta da API)
        if (workouts.length === 0) {
          throw new Error('Usuário não possui um plano de treino ativo. Por favor, complete o onboarding para iniciar um plano de treino.');
        }
        // Se há workouts, provavelmente há um plano, então permitir continuar
        return;
      }

      // Se chegou aqui, há um plano válido
    } catch (error) {
      // Se for um erro que já foi lançado, re-lançar
      if (error instanceof Error && error.message.includes('plano de treino')) {
        throw error;
      }
      // Para outros erros, verificar se há workouts como fallback
      if (workouts.length > 0) {
        // Se há workouts disponíveis, provavelmente há um plano
        return;
      }
      // Se não há workouts e há erro, lançar erro genérico
      throw new Error('Erro ao verificar plano de treino. Tente novamente.');
    }
  }, [refetchUserWorkoutPlan, workouts]);

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
      checkUserWorkoutPlan,
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
