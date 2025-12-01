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
  const {getPatientProfile, isLoggedIn} = useAuth();

  const queries = useExerciseQueries(['exercises'], isLoggedIn);
  const {
    data: userWorkoutPlan = null,
    isLoading,
    error,
  } = queries.getUserWorkoutPlan();

  const isExercisesBlocked = useMemo(() => {
    const profile = getPatientProfile();
    if (profile) {
      return shouldBlockExercises(profile);
    }
    return MMKVStorage.getString(EXERCISES_BLOCKED_KEY) === 'true';
  }, [getPatientProfile]);

  const workouts = useMemo<Exercise[]>(() => {
    if (userWorkoutPlan?.workouts) {
      return userWorkoutPlan.workouts.flatMap(
        (w): Exercise[] => w.exercises || [],
      );
    }
    return [];
  }, [userWorkoutPlan]);

  const handleWorkoutPress = useCallback(
    (exerciseId: string) => {
      if (isExercisesBlocked) {
        return;
      }
      const workout = userWorkoutPlan?.workouts.find((w: Workout) =>
        w.exercises.some((e: Exercise) => e.id === exerciseId),
      );
      if (workout) {
        navigation.navigate('ExerciseDetails', {workout});
      }
    },
    [navigation, userWorkoutPlan, isExercisesBlocked],
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
