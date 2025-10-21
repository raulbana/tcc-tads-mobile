import Label from '../../../../../components/Label/Label';
import * as S from './styles';
import {Workout} from '../../../../../types/exercise';
import ExerciseInfoCard from '../../../../../components/ExerciseInfoCard';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

interface StartWorkoutProps {
  workout: Workout;
  onStartWorkout: () => void;
}

const StartWorkout = ({workout, onStartWorkout}: StartWorkoutProps) => {
  const {name, duration, category, difficulty, description} = workout;

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.Header>
        <Label
          text={name}
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
        />
      </S.Header>
      <S.Illustration />
      <ExerciseInfoCard
        name={name}
        description={description}
        duration={duration}
        category={category} 
        difficulty={difficulty}
        onStartWorkout={onStartWorkout}
      />
    </S.Container>
  );
};

export default StartWorkout;
