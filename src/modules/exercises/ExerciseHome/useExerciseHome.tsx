import {useCallback, useMemo} from 'react';
import {Exercise} from '../../../types/exercise';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ExercisesParamList} from '../../../navigation/routes';
import useExerciseQueries from '../services/exerciseQueryFactory';

const useExerciseHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ExercisesParamList>>();

  const queries = useExerciseQueries(['exercises']);
  const {data: workoutsApi = [], isLoading, error} = queries.listWorkouts();
  console.log('ExerciseHome:listWorkouts', {
    isLoading,
    error: error?.message,
    workoutsApiLength: workoutsApi?.length,
  });
  const workouts = useMemo<Exercise[]>(() => {
    if (workoutsApi.length > 0) {
      return workoutsApi.flatMap((w): Exercise[] => w.exercises || []);
    }
    return [];
  }, [workoutsApi]);
  console.log('ExerciseHome:workoutsFlattened', {length: workouts.length});

  const handleWorkoutPress = useCallback(
    (workoutId: string) => {
      navigation.navigate('ExerciseDetails', {exerciseId: workoutId});
    },
    [navigation],
  );

  return {
    workouts,
    handleWorkoutPress,
    isLoading,
    error,
  };
};

export default useExerciseHome;
