import {useCallback, useMemo, useState, useEffect} from 'react';
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
  const [isReassessmentModalOpen, setIsReassessmentModalOpen] = useState(false);

  const queries = useExerciseQueries(['exercises'], isLoggedIn);
  const {
    data: userWorkoutPlan = null,
    isLoading,
    error,
    refetch: refetchWorkoutPlan,
  } = queries.getUserWorkoutPlan();

  const isExercisesBlocked = useMemo(() => {
    const profile = getPatientProfile();
    if (profile) {
      return shouldBlockExercises(profile);
    }
    return MMKVStorage.getString(EXERCISES_BLOCKED_KEY) === 'true';
  }, [getPatientProfile]);

  const hasNoActivePlan = useMemo(() => {
    if (isLoading) return false;
    if (!userWorkoutPlan) return true;
    if (!userWorkoutPlan.workouts || userWorkoutPlan.workouts.length === 0)
      return true;
    if (userWorkoutPlan.completed) return true;
    return false;
  }, [userWorkoutPlan, isLoading]);

  useEffect(() => {
    if (!isLoading && hasNoActivePlan && !isExercisesBlocked) {
      setIsReassessmentModalOpen(true);
    }
  }, [isLoading, hasNoActivePlan, isExercisesBlocked]);

  const workouts = useMemo<Exercise[]>(() => {
    if (userWorkoutPlan?.workouts) {
      return userWorkoutPlan.workouts.flatMap(
        (w): Exercise[] => w.exercises || [],
      );
    }
    return [];
  }, [userWorkoutPlan]);

  const nextWorkout = useMemo(() => {
    if (!userWorkoutPlan?.nextWorkout || !userWorkoutPlan?.workouts) {
      return null;
    }
    const workoutIndex = userWorkoutPlan.nextWorkout - 1; // Converter para 0-based
    return userWorkoutPlan.workouts[workoutIndex] || null;
  }, [userWorkoutPlan]);

  const nextWorkoutExerciseIds = useMemo(() => {
    if (!nextWorkout) return new Set<string>();
    return new Set(nextWorkout.exercises.map((e: Exercise) => e.id));
  }, [nextWorkout]);

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

  const handleCloseReassessmentModal = useCallback(() => {
    setIsReassessmentModalOpen(false);
  }, []);

  const handleReassessmentSuccess = useCallback(async () => {
    setIsReassessmentModalOpen(false);
    await refetchWorkoutPlan();
  }, [refetchWorkoutPlan]);

  return {
    workouts,
    handleWorkoutPress,
    isLoading,
    error,
    isExercisesBlocked,
    isReassessmentModalOpen,
    handleCloseReassessmentModal,
    handleReassessmentSuccess,
    hasNoActivePlan,
    nextWorkout,
    nextWorkoutExerciseIds,
    userWorkoutPlan,
  };
};

export default useExerciseHome;
