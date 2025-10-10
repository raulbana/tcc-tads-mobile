import {useState} from 'react';
import {Exercise} from '../../../types/exercise';

const useExerciseHome = () => {
  const [workouts] = useState<Exercise[]>([
    {
      id: '1',
      title: 'Treino xyz',
      duration: '1:30h',
      category: 'lorem',
      status: 'PENDING',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
      createdAt: new Date(),
      updatedAt: new Date(),
      repetitions: 10,
      sets: 3,
      dueDate: new Date(),
    },
    {
      id: '2',
      title: 'Treino xyz',
      duration: '1:30h',
      category: 'lorem',
      status: 'PENDING',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      createdAt: new Date(),
      updatedAt: new Date(),
      repetitions: 10,
      sets: 3,
      dueDate: new Date(),
    },
    {
      id: '3',
      title: 'Treino xyz',
      duration: '1:30h',
      category: 'lorem',
      status: 'PENDING',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
      createdAt: new Date(),
      updatedAt: new Date(),
      repetitions: 10,
      sets: 3,
      dueDate: new Date(),
    },
    {
      id: '4',
      title: 'Treino xyz',
      duration: '1:30h',
      category: 'lorem',
      status: 'PENDING',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ac nunc lacus vel lacinia sodales consequat.',
      createdAt: new Date(),
      updatedAt: new Date(),
      repetitions: 10,
      sets: 3,
      dueDate: new Date(),
    },
  ]);

  const handleWorkoutPress = (workoutId: string) => {
    console.log('Workout pressed:', workoutId);
  };

  return {
    workouts,
    handleWorkoutPress,
  };
};

export default useExerciseHome;
