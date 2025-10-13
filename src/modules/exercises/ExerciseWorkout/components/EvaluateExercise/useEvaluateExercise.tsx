import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Exercise, Workout} from '../../../../../types/exercise';
import {QuestionOptions} from '../../../../../types/question';
import {
  completeExerciseEvaluationSchema,
  ExerciseEvaluationAnswers,
} from './schema/exerciseEvaluation';

interface UseEvaluateExerciseProps {
  workout: Workout;
  currentExercise: Exercise;
  onContinue: () => void;
}

const useEvaluateExercise = ({
  workout,
  currentExercise,
  onContinue,
}: UseEvaluateExerciseProps) => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: {errors, isValid},
  } = useForm<ExerciseEvaluationAnswers>({
    resolver: zodResolver(completeExerciseEvaluationSchema),
    mode: 'onChange',
    defaultValues: {
      difficulty: undefined,
      completion: undefined,
    },
  });

  const selectedRating = watch('difficulty');

  const difficultyOptions: QuestionOptions[] = [
    {
      value: 'EASY',
      label: 'Fácil',
    },
    {
      value: 'MODERATE',
      label: 'Regular',
    },
    {
      value: 'HARD',
      label: 'Difícil',
    },
  ];

  const handleContinue = () => {
    handleSubmit(data => {
      onContinue();
    })();
  };

  return {
    selectedRating,
    handleContinue,
    difficultyOptions,
    control,
    errors,
    isValid,
    register,
  };
};

export default useEvaluateExercise;
