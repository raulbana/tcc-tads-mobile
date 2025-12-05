import React from 'react';
import Label from '../Label/Label';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import * as S from './styles';
import Badge from '../Badge/Badge';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export interface WorkoutCardProps {
  title: string;
  duration: string;
  category: string;
  difficulty: string;
  description: string;
  badge: string;
  onPress: () => void;
  showBadge?: boolean;
  disabled?: boolean;
  isNextWorkout?: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  duration,
  category,
  difficulty,
  description,
  badge,
  onPress,
  showBadge = false,
  disabled = false,
  isNextWorkout = false,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.Container isNextWorkout={isNextWorkout}>
      <S.Header>
        <S.TitleContainer>
          <Label
            text={title}
            typography={theme.typography.title.b3}
            color={theme.colors.gray_08}
          />
        </S.TitleContainer>
        {isNextWorkout && (
          <S.BadgeContainer>
            <Badge
              borderColor={theme.colors.purple_02}
              backgroundColor={theme.colors.purple_02}
              content="Próximo treino"
            />
          </S.BadgeContainer>
        )}
        {showBadge && !isNextWorkout && (
          <S.BadgeContainer>
            <Badge
              borderColor={theme.colors.purple_02}
              backgroundColor={theme.colors.purple_02}
              content={badge}
            />
          </S.BadgeContainer>
        )}
      </S.Header>

      <S.MetadataRow>
        <S.MetadataItem>
          <Icon
            name="Clock"
            size={16}
            color={theme.colors.gray_06}
            weight="bold"
          />
          <Label
            text={duration}
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
          />
        </S.MetadataItem>

        <S.MetadataItem>
          <Icon
            name="SquaresFour"
            size={16}
            color={theme.colors.gray_06}
            weight="bold"
          />
          <Label
            text={category}
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
          />
        </S.MetadataItem>

        <S.MetadataItem>
          <Icon
            name="CheckCircle"
            size={16}
            color={theme.colors.gray_06}
            weight="bold"
          />
          <Label
            text={difficulty}
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
          />
        </S.MetadataItem>
      </S.MetadataRow>

      <S.DescriptionContainer>
        <Label
          text={description}
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
        />
      </S.DescriptionContainer>

      <S.ButtonContainer>
        <Button
          text="Detalhes"
          onPress={onPress}
          type="PRIMARY"
          size="MEDIUM"
          disabled={disabled}
        />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default WorkoutCard;
