import React from 'react';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import {TouchableOpacity} from 'react-native';
import ExerciseCard from '../../../../../components/ExerciseCard/ExerciseCard';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';
import { Exercise } from '../../../../../types/exercise';

interface TrainingSectionProps {
  onRedirectToTrainingDetails: () => void;
  onRedirectToAllExercises: () => void;
  exercise: Exercise;
  showBadge?: boolean;
}

const TrainingSection: React.FC<TrainingSectionProps> = ({
  onRedirectToTrainingDetails,
  onRedirectToAllExercises,
  exercise,
  showBadge = false,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.Wrapper>
      <S.Row>
        <Label
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
          text={`Treino do dia`}
        />
        <TouchableOpacity onPress={onRedirectToAllExercises}>
          <Label
            typography={theme.typography.paragraph.m2}
            color={theme.colors.purple_04}
            text={`Ver Tudo`}
          />
        </TouchableOpacity>
      </S.Row>
      <ExerciseCard
        typeCard={'default'}
        exercise={exercise} 
        onPressPrimaryAction={onRedirectToTrainingDetails}
        showBadge={showBadge}
      />
    </S.Wrapper>
  );
};

export default TrainingSection;
