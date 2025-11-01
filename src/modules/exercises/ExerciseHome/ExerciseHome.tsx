import React from 'react';
import {FlatList} from 'react-native';
import * as S from './styles';
import useExerciseHome from './useExerciseHome';
import WorkoutCard from '../../../components/WorkoutCard/WorkoutCard';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {Exercise, ExerciseStatusLabels} from '../../../types/exercise';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';

const ExerciseHome = () => {
  const {workouts, handleWorkoutPress, isLoading, error} = useExerciseHome();
  console.log('ExerciseHome:render', {
    isLoading,
    error: error?.message,
    workoutsLength: workouts?.length,
  });

  const renderWorkoutCard = ({item}: {item: Exercise}) => {
    console.log('ExerciseHome:renderWorkoutCard', {
      id: item.id,
      title: item.title,
      category: item.category,
    });
    const statusLabel = ExerciseStatusLabels[item.status];
    return (
      <WorkoutCard
        title={item.title}
        duration={item.duration}
        category={item.category}
        difficulty={statusLabel}
        description={item.description}
        badge={statusLabel}
        onPress={() => handleWorkoutPress(item.id)}
      />
    );
  };

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
          ListEmptyComponent={
            !isLoading && !error ? (
              <Label
                text="Nenhum treino disponível"
                typography={theme.typography.paragraph.b3}
                color={theme.colors.gray_06}
              />
            ) : null
          }
        />
      </S.Container>
    </ScreenContainer>
  );
};

export default ExerciseHome;
