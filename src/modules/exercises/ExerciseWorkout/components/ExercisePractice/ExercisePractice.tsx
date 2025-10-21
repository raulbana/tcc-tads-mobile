import React from 'react';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import {VideoPlayer} from '../../../../../components/VideoPlayer/VideoPlayer';
import useExercisePractice from './useExercisePractice';
import {Exercise, Workout} from '../../../../../types/exercise';
import Icon from '../../../../../components/Icon/Icon';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

interface ExercisePracticeProps {
  workout: Workout;
  currentExercise: Exercise;
  onNextExercise: () => void;
  onPreviousExercise: () => void;
  onLeaveWorkout: () => void;
}

const ExercisePractice: React.FC<ExercisePracticeProps> = ({
  workout,
  currentExercise,
  onNextExercise,
  onPreviousExercise,
  onLeaveWorkout,
}) => {
  const {
    currentTab,
    setCurrentTab,
    isVideoPaused,
    toggleVideoPlayPause,
    isLastExercise,
    currentImageIndex,
    handleNextImage,
    handlePreviousImage,
  } = useExercisePractice({
    workout,
    currentExercise,
    onNextExercise,
    onPreviousExercise,
    onLeaveWorkout,
  });

  const currentExerciseIndex = workout.exercises.findIndex(
    exercise => exercise.id === currentExercise.id,
  );
  const exerciseNumber = currentExerciseIndex + 1;
  const totalExercises = workout.exercises.length;

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.Header>
        <S.ExerciseTag>
          <Icon
            name="Barbell"
            size={16}
            color={theme.colors.purple_04}
            weight="fill"
          />
          <Label
            text={`Exercício ${exerciseNumber} / ${totalExercises}`}
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.purple_04}
          />
        </S.ExerciseTag>
        <S.Title>
          <Label
            text={currentExercise.title}
            typography={theme.typography.title.b3}
            color={theme.colors.gray_08}
          />
        </S.Title>
      </S.Header>

      <S.TabContainer>
        <S.TabButton
          isActive={currentTab === 'VIDEO'}
          onPress={() => setCurrentTab('VIDEO')}>
          <Label
            text="Vídeo"
            typography={theme.typography.paragraph.sb3}
            color={
              currentTab === 'VIDEO'
                ? theme.colors.gray_08
                : theme.colors.gray_07
            }
          />
        </S.TabButton>
        <S.TabButton
          isActive={currentTab === 'ILLUSTRATION'}
          onPress={() => setCurrentTab('ILLUSTRATION')}>
          <Label
            text="Ilustração"
            typography={theme.typography.paragraph.sb3}
            color={
              currentTab === 'ILLUSTRATION'
                ? theme.colors.gray_08
                : theme.colors.gray_07
            }
          />
        </S.TabButton>
      </S.TabContainer>

      <S.MediaContainer>
        {currentTab === 'VIDEO' && currentExercise.media?.videos?.[0] ? (
          <S.VideoWrapper onPress={toggleVideoPlayPause}>
            <VideoPlayer url={currentExercise.media.videos[0]} />
            {isVideoPaused && <S.PlayButton>▶</S.PlayButton>}
          </S.VideoWrapper>
        ) : (
          <S.ImageContainer>
            <S.CaretButton onPress={handlePreviousImage}>
              <Icon
                name="CaretLeft"
                size={24}
                color={theme.colors.gray_04}
                weight="bold"
              />
            </S.CaretButton>
            <S.ExerciseImage
              source={{
                uri: currentExercise.media?.images?.[currentImageIndex],
              }}
              resizeMode="cover"
            />
            <S.CaretButton onPress={handleNextImage}>
              <Icon
                name="CaretRight"
                size={24}
                color={theme.colors.gray_04}
                weight="bold"
              />
            </S.CaretButton>
          </S.ImageContainer>
        )}
      </S.MediaContainer>

      <S.DescriptionContainer>
        <Label
          text={currentExercise.description}
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
      </S.DescriptionContainer>

      <S.ActionsContainer>
        <Button
          type="PRIMARY"
          text={isLastExercise ? 'Finalizar Treino' : 'Próximo Exercício'}
          onPress={onNextExercise}
        />
        <S.LeaveButton onPress={onLeaveWorkout}>
          <Label
            text="Sair do treino"
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.LeaveButton>
      </S.ActionsContainer>
    </S.Container>
  );
};

export default ExercisePractice;
