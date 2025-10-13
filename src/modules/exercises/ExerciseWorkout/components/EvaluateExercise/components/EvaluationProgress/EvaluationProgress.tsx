import React from 'react';
import * as S from '../../styles';
import Label from '../../../../../../../components/Label/Label';
import theme from '../../../../../../../theme/theme';

interface EvaluationProgressProps {
  currentStep: number;
  totalSteps: number;
}

const EvaluationProgress: React.FC<EvaluationProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <S.ProgressContainer>
      <Label
        text={`Etapa ${currentStep} de ${totalSteps}`}
        typography={theme.typography.paragraph.sm2}
        color={theme.colors.gray_07}
      />
      <S.ProgressBar>
        <S.ProgressFill width={`${(currentStep / totalSteps) * 100}%`} />
      </S.ProgressBar>
    </S.ProgressContainer>
  );
};

export default EvaluationProgress;
