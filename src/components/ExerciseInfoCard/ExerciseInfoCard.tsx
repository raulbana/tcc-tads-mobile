import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { WorkoutDifficulty, WorkoutDifficultyLabels } from '../../types/exercise';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface ExerciseInfoCardProps {
  name: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  onStartWorkout: () => void;
}

const ExerciseInfoCard: React.FC<ExerciseInfoCardProps> = ({
  name,
  description,
  duration,
  category,
  difficulty,
  onStartWorkout,
}) => {
  const theme = useDynamicTheme();
  return (
    <S.Container>
      <S.InfoIconContainer>
        <Icon
          name="Info"
          size={24}
          color={theme.colors.purple_04}
          weight="fill"
        />
        <Label
          text={`Informações do treino:`}
          typography={theme.typography.paragraph.r3}
          color={theme.colors.purple_04}
        />
      </S.InfoIconContainer>
      <S.CenterContainer>
        <Label
          text={`${name}`}
          typography={theme.typography.paragraph.r4}
          color={theme.colors.gray_08}
        />
      </S.CenterContainer>
      <S.Description>
        <Label
          text={description}
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_07}
        />
      </S.Description>

      <S.MetricsContainer>
        <S.MetricItem>
          <Icon
            name="Clock"
            size={16}
            color={theme.colors.gray_07}
            weight="regular"
          />
          <Label
            text={duration}
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.MetricItem>

        <S.MetricItem>
          <Icon
            name="GridFour"
            size={16}
            color={theme.colors.gray_07}
            weight="regular"
          />
          <Label
            text={category}
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.MetricItem>

        <S.MetricItem>
          <Icon
            name="CheckCircle"
            size={16}
            color={theme.colors.gray_07}
            weight="regular"
          />
          <Label
            text={WorkoutDifficultyLabels[difficulty as WorkoutDifficulty]}
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.MetricItem>
      </S.MetricsContainer>

      <S.StartButton>
        <Button type="PRIMARY" text="Iniciar Treino" onPress={onStartWorkout} />
      </S.StartButton>
    </S.Container>
  );
};

export default ExerciseInfoCard;
