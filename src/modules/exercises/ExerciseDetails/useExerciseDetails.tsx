import {useState, useCallback, useMemo} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {ExercisesParamList} from '../../../navigation/routes';
import {Workout} from '../../../types/exercise';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type ExerciseDetailsRouteProp = RouteProp<
  ExercisesParamList,
  'ExerciseDetails'
>;

export const useExerciseDetails = () => {
  const route = useRoute<ExerciseDetailsRouteProp>();
  const {workout: workoutFromRoute} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<ExercisesParamList>>();
  const [activeMediaTab, setActiveMediaTab] = useState<'videos' | 'images'>(
    'videos',
  );
  const workout = useMemo<Workout | undefined>(
    () => workoutFromRoute,
    [workoutFromRoute],
  );

  const handleVideosPress = useCallback(() => {
    setActiveMediaTab('videos');
  }, []);

  const handleImagesPress = useCallback(() => {
    setActiveMediaTab('images');
  }, []);

  const handleStartWorkout = useCallback(() => {
    if (workout) {
      navigation.navigate('ExerciseWorkout', {workout});
    }
  }, [workout, navigation]);

  const getWorkoutCategory = () => {
    return workout?.exercises[0]?.category;
  };

  const getWorkoutName = () => {
    return workout?.name || '';
  };

  const getExercises = () => {
    return workout?.exercises || [];
  };

  return {
    workout: workout as Workout,
    exercises: getExercises(),
    workoutName: getWorkoutName(),
    workoutCategory: getWorkoutCategory(),
    activeMediaTab,
    handleVideosPress,
    handleImagesPress,
    handleStartWorkout,
  };
};
