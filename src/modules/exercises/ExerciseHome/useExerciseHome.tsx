import {useCallback, useMemo} from 'react';
import {Exercise, Workout} from '../../../types/exercise';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ExercisesParamList} from '../../../navigation/routes';
import useExerciseQueries from '../services/exerciseQueryFactory';

const useExerciseHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ExercisesParamList>>();

  const queries = useExerciseQueries(['exercises']);
  const {data: workoutsApi = [], isLoading, error} = queries.listWorkouts();

  const workouts = useMemo<Exercise[]>(() => {
    if (workoutsApi.length > 0) {
      return workoutsApi.flatMap((w): Exercise[] => w.exercises || []);
    }
    return [];
  }, [workoutsApi]);

  const handleWorkoutPress = useCallback(
    (exerciseId: string) => {
      const workout = workoutsApi.find((w: Workout) =>
        w.exercises.some((e: Exercise) => e.id === exerciseId),
      );
      if (workout) {
        navigation.navigate('ExerciseDetails', {workout});
      }
    },
    [navigation, workoutsApi],
  );

  return {
    workouts,
    handleWorkoutPress,
    isLoading,
    error,
  };
};

export default useExerciseHome;
