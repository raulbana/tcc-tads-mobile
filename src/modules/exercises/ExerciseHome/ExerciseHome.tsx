import React from 'react';
import {FlatList} from 'react-native';
import * as S from './styles';
import useExerciseHome from './useExerciseHome';
import WorkoutCard from '../../../components/WorkoutCard/WorkoutCard';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import { Exercise } from '../../../types/exercise';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

const ExerciseHome = () => {
  const {workouts, handleWorkoutPress} = useExerciseHome();

  const renderWorkoutCard = ({item}: {item: Exercise}) => (
    <WorkoutCard
      title={item.title}
      duration={item.duration}
      category={item.category}
      difficulty={item.status}
      description={item.description}
      badge={item.status}
      onPress={() => handleWorkoutPress(item.id)}
    />
  );

  const theme = useDynamicTheme();

  return (
    <ScreenContainer scrollable>
      <S.Container>
        <Label
          text="Treinos"
          typography={theme.typography.title.b2}
          color={theme.colors.gray_08}
        />
        <FlatList
          data={workouts}
          keyExtractor={item => item.id}
          renderItem={renderWorkoutCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          scrollEnabled={false}
        />
      </S.Container>
    </ScreenContainer>
  );
};

export default ExerciseHome;
