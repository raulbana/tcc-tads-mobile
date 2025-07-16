import React from 'react';
import * as S from './styles';

type ProgressBarSteppedProps = {
  steps: number;
  currentStep?: number;
};

const ProgressBarStepped: React.FC<ProgressBarSteppedProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <S.ProgressBarContainer>
      {Array.from({length: steps}).map((_, idx) => {
        const isActive = currentStep === idx + 1;
        const isCompleted = currentStep ? currentStep > idx + 1 : false;
        return (
          <S.Step key={idx} isActive={isActive} isCompleted={isCompleted} />
        );
      })}
    </S.ProgressBarContainer>
  );
};

export default ProgressBarStepped;
