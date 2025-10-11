import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import theme from '../../theme/theme';

export interface ExerciseInfoCardProps {
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  onStartWorkout: () => void;
}

const ExerciseInfoCard: React.FC<ExerciseInfoCardProps> = ({
  description,
  duration,
  category,
  difficulty,
  onStartWorkout,
}) => {
  return (
    <S.Container>
      <S.InfoIconContainer>
        <Icon name="Info" size={16} color={theme.colors.white} weight="fill" />
      </S.InfoIconContainer>

      <S.Description>
        <Label
          text={description}
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
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
            text={difficulty}
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.MetricItem>
      </S.MetricsContainer>

      <S.StartButton>
        <Button
          type="PRIMARY"
          size="LARGE"
          text="Iniciar Treino"
          onPress={onStartWorkout}
        />
      </S.StartButton>
    </S.Container>
  );
};

export default ExerciseInfoCard;
