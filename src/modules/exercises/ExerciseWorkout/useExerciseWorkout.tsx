import {useEffect, useState} from 'react';
import {Exercise, Workout} from '../../../types/exercise';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ExercisesParamList, RootParamList} from '../../../navigation/routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useExerciseQueries from '../services/exerciseQueryFactory';

const fallbackVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';

type ExerciseWorkoutStep =
  | 'START_WORKOUT'
  | 'EXERCISE'
  | 'FINISH_WORKOUT'
  | 'EVALUATE';

type ExerciseWorkoutRouteProp = RouteProp<
  ExercisesParamList,
  'ExerciseWorkout'
>;

const useExerciseWorkout = () => {
  const route = useRoute<ExerciseWorkoutRouteProp>();
  const {exerciseId} = route.params;

  const [workout, setWorkout] = useState<Workout>();
  const [currentExercise, setCurrentExercise] = useState<Exercise>();
  const [step, setStep] = useState<ExerciseWorkoutStep>('START_WORKOUT');
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const queries = useExerciseQueries(['exercises']);
  const {data: workoutApi} = queries.getWorkoutById(exerciseId);
  useEffect(() => {
    if (workoutApi) {
      const withMedia = {
        ...workoutApi,
        exercises: (workoutApi.exercises || []).map(e => ({
          ...e,
          media: e.media || {videos: [fallbackVideo], images: []},
        })),
      };
      setWorkout(withMedia);
      setCurrentExercise(withMedia.exercises[0]);
    }
  }, [workoutApi]);

  const onStartWorkout = () => {
    setStep('EXERCISE');
    if (!workout) return;
    const first = workout.exercises[0];
    setCurrentExercise({...first, status: 'IN_PROGRESS'});
    setWorkout({...workout, status: 'IN_PROGRESS'});
  };

  const onLeaveWorkout = () => {
    setStep('START_WORKOUT');
    if (!workout) return;
    const first = workout.exercises[0];
    setWorkout({...workout, status: 'PAUSED'});
    setCurrentExercise({...first, status: 'PENDING'});
  };

  const onFinishWorkout = () => {
    setStep('FINISH_WORKOUT');
    if (!workout) return;
    const first = workout.exercises[0];
    setWorkout({...workout, status: 'COMPLETED'});
    setCurrentExercise({...first, status: 'COMPLETED'});
  };

  const handleNextStep = () => {
    setStep(step === 'START_WORKOUT' ? 'EXERCISE' : 'FINISH_WORKOUT');
  };

  const handlePreviousStep = () => {
    setStep(step === 'EXERCISE' ? 'START_WORKOUT' : 'EXERCISE');
  };

  const handleEvaluate = () => {
    setStep('EVALUATE');
  };

  const onEvaluate = () => {
    if (workout) setWorkout({...workout, status: 'COMPLETED'});
    navigation.navigate(`Exercises`, {screen: 'ExercisesHome'});
  };

  const onNextExercise = () => {
    if (!workout || !workout.exercises || !currentExercise) return;
    const currentIndex = workout.exercises.findIndex(
      exercise => exercise.id === currentExercise.id,
    );

    setWorkout({
      ...workout,
      exercises: workout.exercises.map(exercise =>
        exercise.id === currentExercise.id
          ? {...exercise, status: 'COMPLETED'}
          : exercise,
      ),
    });

    if (currentIndex !== -1 && currentIndex < workout.exercises.length - 1) {
      setCurrentExercise(workout.exercises[currentIndex + 1]);
      setWorkout(prevWorkout => ({
        ...prevWorkout!,
        exercises: prevWorkout!.exercises.map(exercise => {
          if (exercise.id === workout.exercises[currentIndex + 1].id) {
            return {...exercise, status: 'IN_PROGRESS'};
          }
          return exercise;
        }),
      }));
    } else {
      setStep('EVALUATE');
    }
  };

  const onPreviousExercise = () => {
    if (!workout || !workout.exercises || !currentExercise) return;
    const currentIndex = workout.exercises.findIndex(
      exercise => exercise.id === currentExercise.id,
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setCurrentExercise(workout.exercises[currentIndex - 1]);
    }
  };

  return {
    workout,
    exercises: workout?.exercises,
    currentExercise,
    step,
    setWorkout,
    setCurrentExercise,
    setStep,
    onStartWorkout,
    onLeaveWorkout,
    onFinishWorkout,
    handleNextStep,
    handlePreviousStep,
    handleEvaluate,
    onEvaluate,
    onNextExercise,
    onPreviousExercise,
  };
};

export default useExerciseWorkout;
