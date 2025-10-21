import React from 'react';
import Label from '../Label/Label';
import BenefitsCard from '../BenefitsCard/BenefitsCard';
import {Exercise} from '../../types/exercise';
import * as S from './styles';
import MediaButtons from './components/MediaButtons';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface ExerciseSectionProps {
  exercise: Exercise;
  exerciseNumber: number;
  onVideosPress?: () => void;
  onImagesPress?: () => void;
  activeMediaTab?: 'videos' | 'images';
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  exercise,
  exerciseNumber,
  onVideosPress,
  onImagesPress,
  activeMediaTab = 'videos',
}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Container>
      <S.ExerciseTitle>
        <Label
          text={`Exercício ${exerciseNumber}`}
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
        />
      </S.ExerciseTitle>

      <S.ExerciseDescription>
        <Label
          text={exercise.description}
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
      </S.ExerciseDescription>

      {exercise.benefits && exercise.benefits.length > 0 && (
        <BenefitsCard benefits={exercise.benefits} />
      )}

      <MediaButtons
        hasVideos={!!exercise.media?.videos?.length}
        hasImages={!!exercise.media?.images?.length}
        onVideosPress={onVideosPress}
        onImagesPress={onImagesPress}
        activeTab={activeMediaTab}
      />
    </S.Container>
  );
};

export default ExerciseSection;
