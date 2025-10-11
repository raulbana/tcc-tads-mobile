import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../components/Label/Label';
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import ExerciseSection from '../../../components/ExerciseSection/ExerciseSection';
import theme from '../../../theme/theme';
import {useExerciseDetails} from './useExerciseDetails';
import {Exercise} from '../../../types/exercise';
import * as S from './styles';

const ExerciseDetails = () => {
  const {
    exercises,
    workoutName,
    workoutCategory,
    activeMediaTab,
    handleVideosPress,
    handleImagesPress,
    handleStartWorkout,
  } = useExerciseDetails();

  return (
    <ScreenContainer scrollable>
      <S.Container>
        <S.Header>
          <S.BadgeContainer>
            <Badge
              content={workoutCategory}
              backgroundColor={theme.colors.purple_02}
              textColor={theme.colors.white}
            />
          </S.BadgeContainer>

          <S.Title>
            <Label
              text={workoutName}
              typography={theme.typography.title.b1}
              color={theme.colors.gray_08}
            />
          </S.Title>
        </S.Header>

        {exercises.map((exercise: Exercise, index: number) => (
          <ExerciseSection
            key={exercise.id}
            exercise={exercise}
            exerciseNumber={index + 1}
            onVideosPress={handleVideosPress}
            onImagesPress={handleImagesPress}
            activeMediaTab={activeMediaTab}
          />
        ))}
      </S.Container>
      <S.StartWorkoutButton>
        <Button
          type="PRIMARY"
          text="Iniciar Treino"
          onPress={handleStartWorkout}
        />
      </S.StartWorkoutButton>
    </ScreenContainer>
  );
};

export default ExerciseDetails;
