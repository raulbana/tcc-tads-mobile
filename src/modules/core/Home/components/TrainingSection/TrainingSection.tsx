import React from 'react';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import {TouchableOpacity} from 'react-native';
import ExerciseCard from '../../../../../components/ExerciseCard/ExerciseCard';

interface TrainingSectionProps {
  onRedirectToTrainingDetails: () => void;
}

const TrainingSection: React.FC<TrainingSectionProps> = ({
  onRedirectToTrainingDetails,
}) => {
  return (
    <S.Wrapper>
      <S.Row>
        <Label
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
          text={`Treino do dia`}
        />
        <TouchableOpacity onPress={onRedirectToTrainingDetails}>
          <Label
            typography={theme.typography.paragraph.m2}
            color={theme.colors.purple_04}
            text={`Ver Tudo`}
          />
        </TouchableOpacity>
      </S.Row>
      <ExerciseCard
        typeCard={'default'}
        exercise={{
          id: '1',
          title: 'Treino de Assoalho Pélvico',
          description:
            'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
          duration: '30 min',
          repetitions: 12,
          sets: 3,
          dueDate: new Date(),
          category: 'Força',
          completedAt: new Date(),
        }}
        onPressPrimaryAction={() => {}}
        onPressSecondaryAction={() => {}}
      />
    </S.Wrapper>
  );
};

export default TrainingSection;
