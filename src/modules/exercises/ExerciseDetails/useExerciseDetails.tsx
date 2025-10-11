import {useState, useCallback, useEffect} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {ExercisesParamList} from '../../../navigation/routes';
import {Workout} from '../../../types/exercise';

type ExerciseDetailsRouteProp = RouteProp<
  ExercisesParamList,
  'ExerciseDetails'
>;

export const useExerciseDetails = () => {
  const route = useRoute<ExerciseDetailsRouteProp>();
  const {exerciseId} = route.params;

  const [activeMediaTab, setActiveMediaTab] = useState<'videos' | 'images'>(
    'videos',
  );

  useEffect(() => {
    console.log('ExerciseDetails montado com ID:', exerciseId);
  }, [exerciseId]);

  const mockWorkout: Workout = {
    id: '1',
    name: 'Treino XYZ',
    status: 'PAUSED',
    difficulty: 'MODERATE',
    createdAt: new Date(),
    updatedAt: new Date(),
    exercises: [
      {
        id: '1',
        title: 'Exercício 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        duration: '30 min',
        repetitions: 10,
        sets: 3,
        category: 'Lorem',
        benefits: [
          {
            id: '1',
            title: 'Lorem ipsum dolor sit amet',
            description: 'consectetur adipiscing elit sed do eiusmod',
          },
          {
            id: '2',
            title: 'Lorem ipsum dolor sit amet',
            description: 'consectetur adipiscing elit sed do eiusmod',
          },
        ],
        media: {
          videos: ['video1.mp4'],
          images: ['image1.jpg'],
        },
      },
      {
        id: '2',
        title: 'Exercício 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        duration: '25 min',
        repetitions: 8,
        sets: 2,
        category: 'Lorem',
        benefits: [
          {
            id: '1',
            title: 'Lorem ipsum dolor sit amet',
            description: 'consectetur adipiscing elit sed do eiusmod',
          },
          {
            id: '2',
            title: 'Lorem ipsum dolor sit amet',
            description: 'consectetur adipiscing elit sed do eiusmod',
          },
        ],
        media: {
          videos: ['video2.mp4'],
          images: ['image2.jpg'],
        },
      },
    ],
    duration: '',
    description: '',
    category: ''
  };

  const handleVideosPress = useCallback(() => {
    setActiveMediaTab('videos');
  }, []);

  const handleImagesPress = useCallback(() => {
    setActiveMediaTab('images');
  }, []);

  const handleStartWorkout = useCallback(() => {
    // TODO: Implementar navegação para iniciar treino
    console.log('Iniciar treino:', mockWorkout.name, 'ID:', exerciseId);
  }, [mockWorkout.name, exerciseId]);

  const getWorkoutCategory = () => {
    return mockWorkout.exercises[0]?.category || 'Lorem';
  };

  const getWorkoutName = () => {
    return mockWorkout.name;
  };

  const getExercises = () => {
    return mockWorkout.exercises;
  };

  return {
    // Data
    workout: mockWorkout,
    exercises: getExercises(),
    workoutName: getWorkoutName(),
    workoutCategory: getWorkoutCategory(),
    activeMediaTab,

    // Actions
    handleVideosPress,
    handleImagesPress,
    handleStartWorkout,
  };
};
