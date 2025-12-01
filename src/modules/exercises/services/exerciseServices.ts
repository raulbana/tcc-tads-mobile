import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {
  Exercise,
  Workout,
  WorkoutPlan,
  UserWorkoutPlanDTO,
} from '../../../types/exercise';

const api = apiFactory(BASE_URL);

function mapExerciseDTO(raw: any): Exercise {
  const description = raw.description || raw.instructions || '';
  const mediaArray: any[] = Array.isArray(raw.media) ? raw.media : [];
  const videos = mediaArray
    .filter(
      m =>
        typeof m?.url === 'string' &&
        (m?.contentType || '').startsWith('video'),
    )
    .map(m => m.url);
  const images = mediaArray
    .filter(
      m =>
        typeof m?.url === 'string' &&
        (m?.contentType || '').startsWith('image'),
    )
    .map(m => m.url);

  return {
    id: String(raw.id),
    title: raw.title || raw.name || '',
    description,
    status: (raw.status as Exercise['status']) || 'PENDING',
    createdAt: new Date(raw.createdAt || Date.now()),
    updatedAt: new Date(raw.updatedAt || Date.now()),
    duration:
      typeof raw.duration === 'number'
        ? `${raw.duration}s`
        : raw.duration || '',
    repetitions: raw.repetitions ?? 0,
    sets: raw.sets ?? 0,
    dueDate: raw.dueDate ? new Date(raw.dueDate) : undefined,
    category: raw.category || '',
    completedAt: raw.completedAt ? new Date(raw.completedAt) : undefined,
    benefits: Array.isArray(raw.benefits)
      ? raw.benefits.map((b: any) => ({
          id: String(b.id),
          title: b.title || b.name || '',
          description: b.description || '',
        }))
      : [],
    media: {videos, images},
  };
}

function mapWorkoutDTO(raw: any): Workout {
  const exercisesSource = raw.exercises;
  const exercisesArray: any[] = Array.isArray(exercisesSource)
    ? exercisesSource
    : exercisesSource && typeof exercisesSource === 'object'
    ? Object.values(exercisesSource)
    : [];

  const difficultyLevel = raw.difficultyLevel || raw.difficulty;
  const difficulty: Workout['difficulty'] =
    difficultyLevel === 'BEGINNER'
      ? 'EASY'
      : difficultyLevel === 'MODERATE'
      ? 'MODERATE'
      : difficultyLevel === 'HARD'
      ? 'HARD'
      : 'EASY';

  const totalDuration = raw.totalDuration;
  const duration =
    typeof totalDuration === 'number'
      ? `${totalDuration}s`
      : raw.duration || '';

  return {
    id: String(raw.id),
    name: raw.name || raw.title || '',
    exercises: exercisesArray.map(mapExerciseDTO),
    createdAt: new Date(raw.createdAt || Date.now()),
    updatedAt: new Date(raw.updatedAt || Date.now()),
    scheduledDate: raw.scheduledDate ? new Date(raw.scheduledDate) : undefined,
    evaluatedAt: raw.evaluatedAt ? new Date(raw.evaluatedAt) : undefined,
    notes: raw.notes || '',
    status: (raw.status as Workout['status']) || 'IN_PROGRESS',
    difficulty,
    evaluation: raw.evaluation,
    duration,
    description: raw.description || '',
    category: raw.category || '',
  };
}

const exerciseServices = {
  getExerciseById: async (id: string): Promise<Exercise> => {
    const res = await api.get(apiRoutes.exercises.getExerciseById(id));
    return mapExerciseDTO(res.data);
  },

  submitWorkoutFeedback: async (
    payload: import('../../../types/exercise').ExerciseFeedbackCreatorDTO[],
  ): Promise<void> => {
    await api.post(apiRoutes.exercises.submitWorkoutFeedback, payload);
  },

  submitWorkoutCompletion: async (
    payload: import('../../../types/exercise').WorkoutCompletionDTO[],
  ): Promise<void> => {
    await api.post(apiRoutes.exercises.submitWorkoutCompletion, payload);
  },

  getUserWorkoutPlan: async (): Promise<UserWorkoutPlanDTO | null> => {
    try {
      const res = await api.get(apiRoutes.exercises.getUserWorkoutPlan);
      if (res.status === 204) {
        return null;
      }
      const raw = res.data;
      const workoutsSource = raw.plan?.workouts;
      const workoutsArray: any[] = Array.isArray(workoutsSource)
        ? workoutsSource
        : workoutsSource && typeof workoutsSource === 'object'
        ? Object.values(workoutsSource)
        : [];

      const difficultyLevel = raw.plan.difficultyLevel || raw.plan.difficulty;
      const difficulty: WorkoutPlan['difficulty'] =
        difficultyLevel === 'BEGINNER'
          ? 'EASY'
          : difficultyLevel === 'MODERATE'
          ? 'MODERATE'
          : difficultyLevel === 'HARD'
          ? 'HARD'
          : 'EASY';

      const mappedPlan: WorkoutPlan = {
        id: String(raw.plan.id),
        name: raw.plan.name || raw.plan.title || '',
        description: raw.plan.description || '',
        difficulty,
        workouts: workoutsArray.map(mapWorkoutDTO),
        createdAt: new Date(raw.plan.createdAt || Date.now()),
        updatedAt: new Date(raw.plan.updatedAt || Date.now()),
      };

      return {
        id: raw.id,
        plan: mappedPlan,
        startDate: raw.startDate,
        endDate: raw.endDate,
        totalProgress: raw.totalProgress,
        weekProgress: raw.weekProgress,
        currentWeek: raw.currentWeek,
        nextWorkout: raw.nextWorkout,
        lastWorkoutDate: raw.lastWorkoutDate,
        completed: raw.completed,
        workouts: workoutsArray.map(mapWorkoutDTO),
      };
    } catch (error: any) {
      if (error.response?.status === 204 || error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};

export default exerciseServices;
