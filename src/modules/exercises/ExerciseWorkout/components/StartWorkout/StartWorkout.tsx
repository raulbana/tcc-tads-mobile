import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import * as S from './styles';
import {Workout} from '../../../../../types/exercise';
import ExerciseInfoCard from '../../../../../components/ExerciseInfoCard';

interface StartWorkoutProps {
  workout: Workout;
  onStartWorkout: () => void;
}

const StartWorkout = ({workout, onStartWorkout}: StartWorkoutProps) => {
  return (
    <S.Container>
      <S.Header>
        <Label
          text="Treino: "
          typography={theme.typography.title.m3}
          color={theme.colors.gray_08}
        />
        <Label
          text={workout.name}
          typography={theme.typography.title.b4}
          color={theme.colors.gray_08}
        />
      </S.Header>
      <S.Illustration />
      <ExerciseInfoCard
        description={workout.name}
        duration={workout.duration}
        category={workout.category} 
        difficulty={workout.difficulty}
        onStartWorkout={onStartWorkout}
      />
    </S.Container>
  );
};

export default StartWorkout;
