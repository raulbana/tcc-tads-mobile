import {useEffect, useState, useMemo, useRef} from 'react';
import {Exercise, Workout} from '../../../types/exercise';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ExercisesParamList, RootParamList} from '../../../navigation/routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useExercises} from '../../../contexts/ExerciseContext';
import {useAuth} from '../../../contexts/AuthContext';

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

const formatLocalDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const extractErrorMessage = (error: any): string => {
  // Try to extract message from axios error response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  // Fallback to error message
  if (error?.message) {
    return error.message;
  }
  // Default fallback
  return 'Ocorreu um erro inesperado. Tente novamente.';
};

const useExerciseWorkout = () => {
  const route = useRoute<ExerciseWorkoutRouteProp>();
  const {workout: workoutFromRoute} = route.params;
  const {submitWorkoutCompletion, checkUserWorkoutPlan} = useExercises();
  const {user} = useAuth();
  const scrollRef = useRef<any>(null);
  const workoutStartTimeRef = useRef<Date | null>(null);

  const [workout, setWorkout] = useState<Workout>();
  const [currentExercise, setCurrentExercise] = useState<Exercise>();
  const [step, setStep] = useState<ExerciseWorkoutStep>('START_WORKOUT');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const workoutWithMedia = useMemo<Workout | undefined>(() => {
    if (!workoutFromRoute) return undefined;
    return {
      ...workoutFromRoute,
      exercises: (workoutFromRoute.exercises || []).map(e => ({
        ...e,
        media: e.media || {videos: [fallbackVideo], images: []},
      })),
    };
  }, [workoutFromRoute]);

  useEffect(() => {
    if (workoutWithMedia) {
      setWorkout(workoutWithMedia);
      setCurrentExercise(workoutWithMedia.exercises[0]);
    }
  }, [workoutWithMedia]);

  const onStartWorkout = async () => {
    if (!workout) return;

    try {
      await checkUserWorkoutPlan();
      setStep('EXERCISE');
      workoutStartTimeRef.current = new Date();
      const first = workout.exercises[0];
      setCurrentExercise({...first, status: 'IN_PROGRESS'});
      setWorkout({...workout, status: 'IN_PROGRESS'});
    } catch (error: any) {
      const errorMsg =
        extractErrorMessage(error) ||
        'Você precisa ter um plano de treino ativo para iniciar um treino. Por favor, complete o onboarding.';
      setErrorMessage(errorMsg);
      setIsToastOpen(true);
      return;
    }
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

  const onNextExercise = async () => {
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
      if (user && workout && workoutStartTimeRef.current) {
        const completedAt = new Date();
        const workoutId = Number(workout.id);

        if (!isNaN(workoutId)) {
          try {
            await checkUserWorkoutPlan();
            await submitWorkoutCompletion([
              {
                workoutId,
                completedAt: formatLocalDateTime(completedAt),
              },
            ]);
          } catch (error: any) {
            const errorMsg =
              extractErrorMessage(error) ||
              'Não foi possível registrar a conclusão do treino. Verifique se você possui um plano de treino ativo.';
            setErrorMessage(errorMsg);
            setIsToastOpen(true);
          }
        }
      }
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

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: 0, animated: true});
    }
  };

  const onCloseToast = () => {
    setIsToastOpen(false);
    setErrorMessage('');
  };

  return {
    workout,
    exercises: workout?.exercises,
    currentExercise,
    step,
    scrollRef,
    scrollToTop,
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
    errorMessage,
    isToastOpen,
    onCloseToast,
  };
};

export default useExerciseWorkout;
