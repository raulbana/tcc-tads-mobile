import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../contexts/AuthContext';
import {useExercises} from '../../../contexts/ExerciseContext';
import {NavigationStackProp} from '../../../navigation/routes';
import {useDiary} from '../../../contexts/DiaryContext';
import {useMemo, useEffect} from 'react';
import {useNotificationPermissionModal} from '../../../hooks/useNotificationPermissionModal';
import {MMKVStorage, EXERCISES_BLOCKED_KEY} from '../../../storage/mmkvStorage';
import {shouldBlockExercises} from '../../../utils/profileUtils';

const useHome = () => {
  const {user, isAnonymous, isLoading: isAuthLoading, getPatientProfile} = useAuth();
  const {workoutPlan, isLoading: isExercisesLoading} = useExercises();
  const {calendarData, isLoading: isDiaryLoading} = useDiary();
  const {navigate} = useNavigation<NavigationStackProp>();
  const {
    visible: notificationModalVisible,
    hideModal: hideNotificationModal,
    checkAndShowIfNeeded,
  } = useNotificationPermissionModal();

  const isLoading = isAuthLoading || isExercisesLoading || isDiaryLoading;

  // Verificar se os exercícios estão bloqueados
  const isExercisesBlocked = useMemo(() => {
    const profile = getPatientProfile();
    if (profile) {
      return shouldBlockExercises(profile);
    }
    return MMKVStorage.getString(EXERCISES_BLOCKED_KEY) === 'true';
  }, [getPatientProfile]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        checkAndShowIfNeeded();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, checkAndShowIfNeeded]);

  const hasDiaryEntriesToday = Object.values(calendarData || {}).some(
    day => day.isToday,
  );
  const hasTrainingData = Array.isArray(workoutPlan) && workoutPlan.length > 0;

  const handleNavigateToDiary = () => {
    navigate('MainTabs', {screen: 'Diary'});
  };

  const handleNavigateToTrainingDetails = () => {
    const firstWorkout =
      Array.isArray(workoutPlan) &&
      workoutPlan.length > 0 &&
      workoutPlan[0] &&
      Array.isArray(workoutPlan[0].workouts) &&
      workoutPlan[0].workouts.length > 0
        ? workoutPlan[0].workouts[0]
        : undefined;

    if (firstWorkout) {
      navigate('Exercises', {
        screen: 'ExerciseDetails',
        params: {workout: firstWorkout},
      });
    }
  };

  const handleNavigateToAllExercises = () => {
    navigate('Exercises', {screen: 'ExercisesHome'});
  };

  const titleText = useMemo(() => {
    return user && !isAnonymous ? `Olá, ${user.name}!` : 'Bem vindo(a) ao DailyIU!';
  }, [user, isAnonymous]);

  return {
    user,
    workoutPlan,
    handleNavigateToDiary,
    handleNavigateToTrainingDetails,
    handleNavigateToAllExercises,
    isLoading,
    hasDiaryEntriesToday,
    hasTrainingData,
    titleText,
    notificationModalVisible,
    hideNotificationModal,
    isExercisesBlocked,
  };
};

export default useHome;
