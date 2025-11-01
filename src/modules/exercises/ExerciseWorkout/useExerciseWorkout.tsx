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
      console.error('Erro ao verificar plano de treino:', error);
      // Mostrar mensagem de erro ao usuário - não permite iniciar o treino sem plano ativo
      alert(error.message || 'Você precisa ter um plano de treino ativo para iniciar um treino. Por favor, complete o onboarding.');
      // Não prossegue com o início do treino se não houver plano ativo
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
            // Verifica novamente se o plano de treino está ativo antes de submeter a conclusão
            await checkUserWorkoutPlan();
            await submitWorkoutCompletion([
              {
                workoutId,
                completedAt: formatLocalDateTime(completedAt),
              },
            ]);
          } catch (error: any) {
            console.error('Erro ao enviar completion do treino:', error);
            // Mostra mensagem de erro ao usuário
            const errorMessage = error.message || 'Não foi possível registrar a conclusão do treino. Verifique se você possui um plano de treino ativo.';
            alert(errorMessage);
            // Ainda permite prosseguir para avaliação mesmo se houver erro
          }
        } else {
          console.error('Workout ID inválido:', workout.id);
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
  };
};

export default useExerciseWorkout;
