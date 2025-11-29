import {useCallback, useMemo} from 'react';
import {Exercise, Workout} from '../../../types/exercise';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ExercisesParamList} from '../../../navigation/routes';
import useExerciseQueries from '../services/exerciseQueryFactory';
import {MMKVStorage, EXERCISES_BLOCKED_KEY} from '../../../storage/mmkvStorage';
import {useAuth} from '../../../contexts/AuthContext';
import {shouldBlockExercises} from '../../../utils/profileUtils';

const useExerciseHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ExercisesParamList>>();
  const {getPatientProfile} = useAuth();

  const queries = useExerciseQueries(['exercises']);
  const {data: workoutsApi = [], isLoading, error} = queries.listWorkouts();

  const isExercisesBlocked = useMemo(() => {
    const profile = getPatientProfile();
    if (profile) {
      return shouldBlockExercises(profile);
    }
    return MMKVStorage.getString(EXERCISES_BLOCKED_KEY) === 'true';
  }, [getPatientProfile]);

  const workouts = useMemo<Exercise[]>(() => {
    if (workoutsApi.length > 0) {
      return workoutsApi.flatMap((w): Exercise[] => w.exercises || []);
    }
    return [];
  }, [workoutsApi]);

  const handleWorkoutPress = useCallback(
    (exerciseId: string) => {
      if (isExercisesBlocked) {
        return;
      }
      const workout = workoutsApi.find((w: Workout) =>
        w.exercises.some((e: Exercise) => e.id === exerciseId),
      );
      if (workout) {
        navigation.navigate('ExerciseDetails', {workout});
      }
    },
    [navigation, workoutsApi, isExercisesBlocked],
  );

  return {
    workouts,
    handleWorkoutPress,
    isLoading,
    error,
    isExercisesBlocked,
  };
};

export default useExerciseHome;
