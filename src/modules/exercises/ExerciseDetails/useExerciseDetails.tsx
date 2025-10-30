import {useState, useCallback, useMemo} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {ExercisesParamList} from '../../../navigation/routes';
import {Workout} from '../../../types/exercise';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useExerciseQueries from '../services/exerciseQueryFactory';
type ExerciseDetailsRouteProp = RouteProp<
  ExercisesParamList,
  'ExerciseDetails'
>;

export const useExerciseDetails = () => {
  const route = useRoute<ExerciseDetailsRouteProp>();
  const {exerciseId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<ExercisesParamList>>();
  const [activeMediaTab, setActiveMediaTab] = useState<'videos' | 'images'>(
    'videos',
  );
  const queries = useExerciseQueries(['exercises']);
  const {data: workoutApi} = queries.getWorkoutById(exerciseId);
  const workout = useMemo<Workout | undefined>(() => workoutApi, [workoutApi]);

  const handleVideosPress = useCallback(() => {
    setActiveMediaTab('videos');
  }, []);

  const handleImagesPress = useCallback(() => {
    setActiveMediaTab('images');
  }, []);

  const handleStartWorkout = useCallback(() => {
    navigation.navigate('ExerciseWorkout', {exerciseId});
  }, [exerciseId, navigation]);

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
