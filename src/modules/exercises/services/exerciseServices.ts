import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {
  Exercise,
  Workout,
  WorkoutPlan,
  UserWorkoutFeedbackDTO,
  UserWorkoutCompletionDTO,
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
  listExercises: async (): Promise<Exercise[]> => {
    const res = await api.get(apiRoutes.exercises.listExercises);
    const arr = Array.isArray(res.data) ? res.data : [];
    return arr.map(mapExerciseDTO);
  },

  getExerciseById: async (id: string): Promise<Exercise> => {
    const res = await api.get(apiRoutes.exercises.getExerciseById(id));
    return mapExerciseDTO(res.data);
  },

  listWorkouts: async (): Promise<Workout[]> => {
    const res = await api.get(apiRoutes.exercises.listWorkouts);
    const arr = Array.isArray(res.data) ? res.data : [];
    return arr.map(mapWorkoutDTO);
  },

  getWorkoutById: async (id: string): Promise<Workout> => {
    const res = await api.get(apiRoutes.exercises.getWorkoutById(id));
    return mapWorkoutDTO(res.data);
  },

  listWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
    const res = await api.get(apiRoutes.exercises.listWorkoutPlans);
    const arr = Array.isArray(res.data) ? res.data : [];
    return arr.map((raw: any): WorkoutPlan => {
      const workoutsSource = raw.workouts;
      const workoutsArray: any[] = Array.isArray(workoutsSource)
        ? workoutsSource
        : workoutsSource && typeof workoutsSource === 'object'
        ? Object.values(workoutsSource)
        : [];
      return {
        id: String(raw.id),
        name: raw.name || raw.title || '',
        description: raw.description || '',
        difficulty: 'EASY',
        workouts: workoutsArray.map(mapWorkoutDTO),
        createdAt: new Date(raw.createdAt || Date.now()),
        updatedAt: new Date(raw.updatedAt || Date.now()),
      };
    });
  },

  getWorkoutPlanById: async (id: string): Promise<WorkoutPlan> => {
    const res = await api.get(apiRoutes.exercises.getWorkoutPlanById(id));
    const raw = res.data;
    const workoutsSource = raw.workouts;
    const workoutsArray: any[] = Array.isArray(workoutsSource)
      ? workoutsSource
      : workoutsSource && typeof workoutsSource === 'object'
      ? Object.values(workoutsSource)
      : [];
    return {
      id: String(raw.id),
      name: raw.name || raw.title || '',
      description: raw.description || '',
      difficulty: 'EASY',
      workouts: workoutsArray.map(mapWorkoutDTO),
      createdAt: new Date(raw.createdAt || Date.now()),
      updatedAt: new Date(raw.updatedAt || Date.now()),
    };
  },

  submitWorkoutFeedback: async (
    payload: UserWorkoutFeedbackDTO,
  ): Promise<void> => {
    await api.post(apiRoutes.exercises.submitWorkoutFeedback, payload);
  },

  submitWorkoutCompletion: async (
    payload: UserWorkoutCompletionDTO,
  ): Promise<void> => {
    await api.post(apiRoutes.exercises.submitWorkoutCompletion, payload);
  },
};

export default exerciseServices;
