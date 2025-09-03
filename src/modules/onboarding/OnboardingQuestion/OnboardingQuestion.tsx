import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import * as S from './styles';
import StepLabel from './components/StepLabel/StepLabel';
import QuestionSection from './components/QuestionSection/QuestionSection';
import ProgressBarStepped from '../../../components/ProgressBarStepped/ProgressBarStepped';
import useOnboardingQuestion from './useOnboardingQuestion';
import Loader from '../../../components/Loader/Loader';
import Toast from '../../../components/Toast/Toast';

const OnboardingQuestion = () => {
  const {
    questionInputs,
    currentQuestionIndex,
    errorMessage,
    isToastOpen,
    onCloseToast,
    navigateBack,
    isLoading,
  } = useOnboardingQuestion();

  return isLoading ? (
    <Loader />
  ) : (
    <ScreenContainer
      scrollable
      headerShown
      goBack={navigateBack}
      goBackTo="Voltar"
      currentPage="Questionário"
      >
      <Toast
        type={'ERROR'}
        message={errorMessage}
        isOpen={isToastOpen}
        duration={5000}
        onClose={onCloseToast}
      />
      <S.Wrapper>
        <ProgressBarStepped
          steps={questionInputs.length}
          currentStep={currentQuestionIndex + 1}
        />
        <StepLabel
          step={currentQuestionIndex + 1}
          totalSteps={questionInputs.length}
        />
        {questionInputs[currentQuestionIndex] && (
          <QuestionSection
            question={questionInputs[currentQuestionIndex].question}
            control={questionInputs[currentQuestionIndex].control}
            onContinue={questionInputs[currentQuestionIndex].onContinue}
            setValue={questionInputs[currentQuestionIndex].setValue}
          />
        )}
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default OnboardingQuestion;
