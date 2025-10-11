import {useEffect, useState} from 'react';
import {Exercise, Workout} from '../../../types/exercise';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ExercisesParamList} from '../../../navigation/routes';

const mockWorkout: Workout = {
  id: '',
  name: '',
  exercises: [
    {
      id: '1',
      title: 'Exercício 1',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      duration: '30h',
      repetitions: 12,
      sets: 3,
      category: 'lorem',
    },
    {
      id: '2',
      title: 'Exercício 2',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      duration: '30h',
      repetitions: 12,
      sets: 0,
      category: 'lorem',
    },
    {
      id: '3',
      title: 'Exercício 3',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      duration: '30h',
      repetitions: 12,
      sets: 0,
      category: 'lorem',
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'IN_PROGRESS',
  difficulty: 'EASY',
  duration: '1:30h',
  description:
    'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
  category: 'lorem',
};

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

  useEffect(() => {
    setWorkout(mockWorkout);
  }, []);

  const onStartWorkout = () => {
    setStep('EXERCISE');
    setCurrentExercise(mockWorkout.exercises[0]);
    setWorkout({...mockWorkout, status: 'IN_PROGRESS'});
    setCurrentExercise({...mockWorkout.exercises[0], status: 'IN_PROGRESS'});
  };

  const onLeaveWorkout = () => {
    setStep('START_WORKOUT');
    setWorkout({...mockWorkout, status: 'PAUSED'});
    setCurrentExercise({...mockWorkout.exercises[0], status: 'PENDING'});
  };

  const onFinishWorkout = () => {
    setStep('FINISH_WORKOUT');
    setWorkout({...mockWorkout, status: 'COMPLETED'});
    setCurrentExercise({...mockWorkout.exercises[0], status: 'COMPLETED'});
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
    setStep('START_WORKOUT');
    setWorkout({...mockWorkout, status: 'COMPLETED'});
  };

  const onNextExercise = () => {
    if (!workout || !workout.exercises || !currentExercise) return;
    const currentIndex = workout.exercises.findIndex(
      exercise => exercise.id === currentExercise.id,
    );
    if (currentIndex !== -1 && currentIndex < workout.exercises.length - 1) {
      setCurrentExercise(workout.exercises[currentIndex + 1]);

      setWorkout({
        ...workout,
        exercises: workout.exercises.map(exercise => {
            if(exercise.id === workout.exercises[currentIndex].id){
                return {...exercise, status: 'COMPLETED'};
            }

            if(workout.exercises[currentIndex + 1]){
                if(exercise.id === workout.exercises[currentIndex + 1].id){
                    return {...exercise, status: 'IN_PROGRESS'};
                }
            }
            return exercise;
        }),
      });
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
  };
};

export default useExerciseWorkout;
