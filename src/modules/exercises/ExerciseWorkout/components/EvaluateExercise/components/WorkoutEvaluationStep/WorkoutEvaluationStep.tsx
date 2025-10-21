import React from 'react';
import {Controller} from 'react-hook-form';
import {Control, FieldErrors} from 'react-hook-form';
import Label from '../../../../../../../components/Label/Label';
import Button from '../../../../../../../components/Button/Button';
import Icon from '../../../../../../../components/Icon/Icon';
import RadioButtonGroup from '../../../../../../../components/RadioButtonGroup/RadioButtonGroup';
import {QuestionOptions} from '../../../../../../../types/question';
import * as S from '../../styles';
import {WorkoutEvaluationAnswers} from '../../schema/exerciseEvaluation';
import { useDynamicTheme } from '../../../../../../../hooks/useDynamicTheme';

interface WorkoutEvaluationStepProps {
  control: Control<WorkoutEvaluationAnswers>;
  errors: FieldErrors<WorkoutEvaluationAnswers>;
  difficultyOptions: QuestionOptions[];
  onContinue: () => void;
  isValid: boolean;
}

const WorkoutEvaluationStep: React.FC<WorkoutEvaluationStepProps> = ({
  control,
  errors,
  difficultyOptions,
  onContinue,
}) => {

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.Header>
        <S.CongratulationsTag>
          <Icon
            name="Sparkle"
            size={16}
            color={theme.colors.purple_04}
            weight="fill"
          />
          <Label
            text="Parabéns!"
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.purple_04}
          />
        </S.CongratulationsTag>

        <S.Title>
          <Label
            text="Treino concluído!"
            typography={theme.typography.title.b2}
            color={theme.colors.gray_08}
          />
        </S.Title>

        <S.Subtitle>
          <Label
            text="Você está um passo mais perto de uma vida mais autônoma e confiante!"
            typography={theme.typography.paragraph.r4}
            color={theme.colors.gray_08}
          />
        </S.Subtitle>
      </S.Header>

      <S.IllustrationContainer>
        <S.Illustration />
      </S.IllustrationContainer>

      <S.EvaluationSection>
        <S.SectionTitle>
          <Label
            text="Avalie seu treino"
            typography={theme.typography.title.sb4}
            color={theme.colors.gray_08}
          />
        </S.SectionTitle>

        <S.SectionDescription>
          <Label
            text="Usaremos essa informação para ajustar a dificuldade dos seus próximos exercícios"
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
          />
        </S.SectionDescription>
      </S.EvaluationSection>

      <S.RatingContainer>
        <Controller
          control={control}
          name="difficulty"
          render={({field: {onChange, value}}) => (
            <RadioButtonGroup
              options={difficultyOptions}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.difficulty && (
          <Label
            style={{marginBottom: 0, marginTop: 16}}
            text={errors.difficulty.message || 'Erro de validação'}
            typography={theme.typography.paragraph.sm1}
            color={theme.colors.error}
          />
        )}
      </S.RatingContainer>

      <S.ActionContainer>
        <Button type="PRIMARY" text="Continuar" onPress={onContinue} />
      </S.ActionContainer>
    </S.Container>
  );
};

export default WorkoutEvaluationStep;
