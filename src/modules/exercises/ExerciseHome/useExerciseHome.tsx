import {useState, useCallback} from 'react';
import {Exercise} from '../../../types/exercise';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ExercisesParamList} from '../../../navigation/routes';

const useExerciseHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ExercisesParamList>>();

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

  const handleWorkoutPress = useCallback(
    (workoutId: string) => {
      navigation.navigate('ExerciseDetails', {exerciseId: workoutId});
    },
    [navigation],
  );

  return {
    workouts,
    handleWorkoutPress,
  };
};

export default useExerciseHome;
