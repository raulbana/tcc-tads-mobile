import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../contexts/AuthContext';
import {useExercises} from '../../../contexts/ExerciseContext';
import {NavigationStackProp} from '../../../navigation/routes';
import {useDiary} from '../../../contexts/DiaryContext';

const useHome = () => {
  const {user, isLoading: isAuthLoading} = useAuth();
  const {workoutPlan, isLoading: isExercisesLoading} = useExercises();
  const {calendarData, isLoading: isDiaryLoading} = useDiary();
  const {navigate} = useNavigation<NavigationStackProp>();

  const isLoading = isAuthLoading || isExercisesLoading || isDiaryLoading;

  const hasDiaryEntriesToday = Object.values(calendarData || {}).some(day => day.isToday);
  const hasTrainingData = workoutPlan.length > 0;

  const handleNavigateToDiary = () => {
    navigate('MainTabs', {screen: 'Diary'});
  };

  const handleNavigateToTrainingDetails = () => {
    navigate('Exercises', {screen: 'ExerciseDetails', params: {exerciseId: workoutPlan[0].workouts[0].exercises[0].id}});
  };

  const handleNavigateToAllExercises = () => {
    navigate('Exercises', {screen: 'ExercisesHome'});
  };

  return {
    user,
    workoutPlan,
    handleNavigateToDiary,
    handleNavigateToTrainingDetails,
    handleNavigateToAllExercises,
    isLoading,
    hasDiaryEntriesToday,
    hasTrainingData,
  };
};

export default useHome;
