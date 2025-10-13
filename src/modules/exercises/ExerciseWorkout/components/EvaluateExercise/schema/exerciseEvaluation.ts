import z from 'zod';

// Schema para avaliação geral do treino (Etapa 1)
export const workoutEvaluationSchema = z.object({
  difficulty: z.enum(['EASY', 'MODERATE', 'HARD'], {
    required_error: 'Selecione uma opção de dificuldade',
  }),
});

// Schema para avaliação específica de exercícios (Etapa 2)
export const exerciseSpecificEvaluationSchema = z.object({
  completion: z.enum(['EASILY', 'WITH_DIFFICULTY', 'COULD_NOT_COMPLETE'], {
    required_error: 'Selecione uma opção de conclusão',
  }),
});

// Schema completo combinado
export const completeExerciseEvaluationSchema = workoutEvaluationSchema.merge(exerciseSpecificEvaluationSchema);

export type WorkoutEvaluationAnswers = z.infer<typeof workoutEvaluationSchema>;
export type ExerciseSpecificEvaluationAnswers = z.infer<typeof exerciseSpecificEvaluationSchema>;
export type ExerciseEvaluationAnswers = z.infer<typeof completeExerciseEvaluationSchema>;
