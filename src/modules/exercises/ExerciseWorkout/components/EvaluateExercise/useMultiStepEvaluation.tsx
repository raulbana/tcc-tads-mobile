import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Exercise, Workout} from '../../../../../types/exercise';
import {QuestionOptions} from '../../../../../types/question';
import {
  workoutEvaluationSchema,
  exerciseSpecificEvaluationSchema,
  WorkoutEvaluationAnswers,
  ExerciseSpecificEvaluationAnswers,
} from './schema/exerciseEvaluation';

type EvaluationStep = 'WORKOUT_EVALUATION' | 'EXERCISE_EVALUATION';

interface UseMultiStepEvaluationProps {
  workout: Workout;
  currentExercise: Exercise;
  onComplete: (data: {
    workoutEvaluation: WorkoutEvaluationAnswers;
    exercisesEvaluations: Array<{
      exerciseId: string;
      evaluation: ExerciseSpecificEvaluationAnswers;
    }>;
  }) => void;
}

const useMultiStepEvaluation = ({
  workout,
  currentExercise: _currentExercise,
  onComplete,
}: UseMultiStepEvaluationProps) => {
  const [currentStep, setCurrentStep] =
    useState<EvaluationStep>('WORKOUT_EVALUATION');
  const [workoutEvaluationData, setWorkoutEvaluationData] =
    useState<WorkoutEvaluationAnswers | null>(null);
  const [currentExerciseEvaluationIndex, setCurrentExerciseEvaluationIndex] =
    useState(0);
  const [exercisesEvaluations, setExercisesEvaluations] = useState<
    Array<{
      exerciseId: string;
      evaluation: ExerciseSpecificEvaluationAnswers;
    }>
  >([]);

  const workoutForm = useForm<WorkoutEvaluationAnswers>({
    resolver: zodResolver(workoutEvaluationSchema),
    mode: 'onChange',
    defaultValues: {
      difficulty: undefined,
    },
  });

  const exerciseForm = useForm<ExerciseSpecificEvaluationAnswers>({
    resolver: zodResolver(exerciseSpecificEvaluationSchema),
    mode: 'onChange',
    defaultValues: {
      completion: undefined,
    },
  });

  useEffect(() => {
    if (currentStep === 'EXERCISE_EVALUATION') {
      exerciseForm.reset({
        completion: undefined,
      });
    }
  }, [currentExerciseEvaluationIndex, currentStep]);

  const totalExercises = workout.exercises.length;
  const currentExercise = workout.exercises[currentExerciseEvaluationIndex];
  const isLastExercise = currentExerciseEvaluationIndex === totalExercises - 1;
  const isLastStep = currentStep === 'EXERCISE_EVALUATION' && isLastExercise;

  const totalSteps = 1 + totalExercises;
  const currentStepIndex =
    currentStep === 'WORKOUT_EVALUATION'
      ? 1
      : 1 + currentExerciseEvaluationIndex + 1;

  const difficultyOptions: QuestionOptions[] = [
    {value: 'EASY', label: 'Fácil'},
    {value: 'MODERATE', label: 'Regular'},
    {value: 'HARD', label: 'Difícil'},
  ];

  const completionOptions: QuestionOptions[] = [
    {value: 'EASILY', label: 'Consegui com tranquilidade'},
    {value: 'WITH_DIFFICULTY', label: 'Consegui com dificuldade'},
    {value: 'COULD_NOT_COMPLETE', label: 'Não consegui'},
  ];

  const confidenceOptions: QuestionOptions[] = [
    {value: 'VERY_CONFIDENT', label: 'Muito confiante'},
    {value: 'CONFIDENT', label: 'Confiante'},
    {value: 'NEUTRAL', label: 'Neutro'},
    {value: 'NOT_CONFIDENT', label: 'Não confiante'},
  ];

  const handleNextStep = () => {
    if (currentStep === 'WORKOUT_EVALUATION') {
      const workoutData = workoutForm.getValues();
      setWorkoutEvaluationData(workoutData);
      setCurrentStep('EXERCISE_EVALUATION');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'EXERCISE_EVALUATION') {
      if (currentExerciseEvaluationIndex === 0) {
        setCurrentStep('WORKOUT_EVALUATION');
      } else {
        setCurrentExerciseEvaluationIndex(currentExerciseEvaluationIndex - 1);
      }
    }
  };

  const handleComplete = () => {
    if (!workoutEvaluationData) return;

    onComplete({
      workoutEvaluation: workoutEvaluationData,
      exercisesEvaluations: exercisesEvaluations,
    });
  };

  const handleWorkoutContinue = () => {
    workoutForm.handleSubmit(data => {
      handleNextStep();
    })();
  };

  const handleExerciseContinue = () => {
    exerciseForm.handleSubmit(data => {
      const newEvaluation = {
        exerciseId: currentExercise.id,
        evaluation: data,
      };

      const updatedEvaluations = [...exercisesEvaluations, newEvaluation];
      setExercisesEvaluations(updatedEvaluations);

      if (!isLastExercise) {
        setCurrentExerciseEvaluationIndex(currentExerciseEvaluationIndex + 1);
      } else {
        if (workoutEvaluationData) {
          onComplete({
            workoutEvaluation: workoutEvaluationData,
            exercisesEvaluations: updatedEvaluations,
          });
        }
      }
    })();
  };

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    isLastStep,
    handleNextStep,
    handlePreviousStep,

    workoutForm,
    exerciseForm,

    handleWorkoutContinue,
    handleExerciseContinue,

    difficultyOptions,
    completionOptions,
    confidenceOptions,

    currentExercise,
    currentExerciseIndex: currentExerciseEvaluationIndex + 1,
    totalExercises,
    isLastExercise,
  };
};

export default useMultiStepEvaluation;
