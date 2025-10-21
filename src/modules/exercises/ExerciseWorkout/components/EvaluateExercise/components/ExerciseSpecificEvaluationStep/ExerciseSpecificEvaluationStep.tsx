import React from 'react';
import {Controller} from 'react-hook-form';
import {Control, FieldErrors} from 'react-hook-form';
import Label from '../../../../../../../components/Label/Label';
import Button from '../../../../../../../components/Button/Button';
import Icon from '../../../../../../../components/Icon/Icon';
import RadioButtonGroup from '../../../../../../../components/RadioButtonGroup/RadioButtonGroup';
import {QuestionOptions} from '../../../../../../../types/question';
import {Exercise} from '../../../../../../../types/exercise';
import * as S from '../../styles';
import {ExerciseSpecificEvaluationAnswers} from '../../schema/exerciseEvaluation';
import { useDynamicTheme } from '../../../../../../../hooks/useDynamicTheme';

interface ExerciseSpecificEvaluationStepProps {
  control: Control<ExerciseSpecificEvaluationAnswers>;
  errors: FieldErrors<ExerciseSpecificEvaluationAnswers>;
  completionOptions: QuestionOptions[];
  confidenceOptions: QuestionOptions[];
  currentExercise: Exercise;
  currentExerciseIndex: number;
  totalExercises: number;
  onContinue: () => void;
  onPrevious: () => void;
  isValid: boolean;
  isLastExercise: boolean;
}

const ExerciseSpecificEvaluationStep: React.FC<
  ExerciseSpecificEvaluationStepProps
> = ({
  control,
  errors,
  completionOptions,
  currentExercise,
  currentExerciseIndex,
  totalExercises,
  onContinue,
  onPrevious,
  isLastExercise,
}) => {
  
  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.Header>
        <S.CongratulationsTag>
          <Icon
            name="Barbell"
            size={16}
            color={theme.colors.purple_04}
            weight="fill"
          />
          <Label
            text={`Exercício ${currentExerciseIndex} de ${totalExercises}`}
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.purple_04}
          />
        </S.CongratulationsTag>

        <S.Title>
          <Label
            text={currentExercise.title}
            typography={theme.typography.title.b2}
            color={theme.colors.gray_08}
          />
        </S.Title>

        <S.Subtitle>
          <Label
            text="Avalie como foi a execução deste exercício"
            typography={theme.typography.paragraph.r4}
            color={theme.colors.gray_08}
          />
        </S.Subtitle>
      </S.Header>

      <S.IllustrationContainer>
        <S.Illustration />
      </S.IllustrationContainer>

      <S.EvaluationSection>
        <S.SectionDescription>
          <Label
            text="Você conseguiu concluir o exercício?"
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.SectionDescription>
      </S.EvaluationSection>

      <S.RatingContainer>
        <Controller
          control={control}
          name="completion"
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={completionOptions}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.completion && (
          <Label
            style={{marginBottom: 0, marginTop: 16}}
            text={errors.completion.message || 'Erro de validação'}
            typography={theme.typography.paragraph.sm1}
            color={theme.colors.error}
          />
        )}
      </S.RatingContainer>

      <S.ActionContainer>
        <Button
          type="PRIMARY"
          text={isLastExercise ? 'Finalizar Avaliação' : 'Próximo Exercício'}
          onPress={onContinue}
        />
        <Button type="SECONDARY" text="Voltar" onPress={onPrevious} />
      </S.ActionContainer>
    </S.Container>
  );
};

export default ExerciseSpecificEvaluationStep;
