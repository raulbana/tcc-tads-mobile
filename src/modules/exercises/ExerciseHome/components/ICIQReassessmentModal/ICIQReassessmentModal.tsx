import React, {useEffect, useState} from 'react';
import BottomModal from '../../../../../components/BottomModal/BottomModal';
import DialogModal from '../../../../../components/DialogModal/DialogModal';
import * as S from './styles';
import StepLabel from '../../../../onboarding/OnboardingQuestion/components/StepLabel/StepLabel';
import ProgressBarStepped from '../../../../../components/ProgressBarStepped/ProgressBarStepped';
import useICIQReassessment from '../../hooks/useICIQReassessment';
import Loader from '../../../../../components/Loader/Loader';
import Toast from '../../../../../components/Toast/Toast';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {useQuestionSection} from '../../../../onboarding/OnboardingQuestion/components/QuestionSection/useQuestionSection';
import {useFormState} from 'react-hook-form';
import {ICIQAnswers} from '../../../../onboarding/OnboardingQuestion/schema/questionnaire';
import Input from '../../../../../components/Input/Input';
import RadioButtonGroup from '../../../../../components/RadioButtonGroup/RadioButtonGroup';
import SliderInput from '../../../../../components/Slider/SliderInput';
import DatePickerInput from '../../../../../components/DatePicker/DatePicker';
import Button from '../../../../../components/Button/Button';
import {verticalScale} from '../../../../../utils/scales';

interface ICIQReassessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ICIQReassessmentModal: React.FC<ICIQReassessmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const {
    questionInputs,
    currentQuestionIndex,
    errorMessage,
    isToastOpen,
    onCloseToast,
    navigateBack,
    isLoading,
    resetForm,
    iciqQuestions,
    onContinue,
  } = useICIQReassessment();

  useEffect(() => {
    if (isOpen) {
      setShowConfirmationDialog(true);
      setShowQuestionsModal(false);
    } else {
      setShowConfirmationDialog(false);
      setShowQuestionsModal(false);
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleClose = () => {
    resetForm();
    setShowConfirmationDialog(false);
    setShowQuestionsModal(false);
    onClose();
  };

  const handleConfirmReassessment = () => {
    setShowConfirmationDialog(false);
    setShowQuestionsModal(true);
  };

  const handleCancelReassessment = () => {
    setShowConfirmationDialog(false);
    setShowQuestionsModal(false);
    onClose();
  };

  return (
    <>
      <DialogModal
        visible={showConfirmationDialog}
        onClose={handleCancelReassessment}
        title="Reavaliação ICIQ"
        description="Deseja refazer a avaliação ICIQ agora?"
        dismissOnBackdropPress={false}
        secondaryButton={{
          label: 'Realizar depois',
          onPress: handleCancelReassessment,
          type: 'SECONDARY',
        }}
        primaryButton={{
          label: 'Refazer avaliação',
          onPress: handleConfirmReassessment,
          type: 'PRIMARY',
        }}
      />
      <BottomModal
        isOpen={showQuestionsModal}
        onClose={handleClose}
        title="Reavaliação ICIQ"
        closeOnBackdropPress={false}
        showClose={true}>
        {isLoading ? (
          <Loader />
        ) : (
          <S.Wrapper
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: verticalScale(80),
            }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            nestedScrollEnabled={true}>
            <ProgressBarStepped
              steps={questionInputs.length}
              currentStep={currentQuestionIndex + 1}
            />
            <S.StepLabelContainer>
              <StepLabel
                step={currentQuestionIndex + 1}
                totalSteps={questionInputs.length}
              />
            </S.StepLabelContainer>
            <S.QuestionContainer>
              {questionInputs[currentQuestionIndex] && (
                <QuestionSectionContent
                  question={questionInputs[currentQuestionIndex].question}
                  control={questionInputs[currentQuestionIndex].control}
                  onContinue={async field => {
                    const result = await onContinue(field as any);
                    if (
                      result &&
                      currentQuestionIndex === iciqQuestions.length - 1
                    ) {
                      handleClose();
                      onSuccess();
                    }
                    return result;
                  }}
                  setValue={questionInputs[currentQuestionIndex].setValue}
                />
              )}
            </S.QuestionContainer>
            {currentQuestionIndex > 0 && (
              <S.ButtonContainer>
                <Button type="SECONDARY" text="Voltar" onPress={navigateBack} />
              </S.ButtonContainer>
            )}
          </S.Wrapper>
        )}
      </BottomModal>
      <Toast
        type="ERROR"
        message={errorMessage}
        isOpen={isToastOpen}
        duration={5000}
        onClose={onCloseToast}
      />
    </>
  );
};

interface QuestionSectionContentProps {
  question: any;
  control: any;
  onContinue: (id: any) => Promise<boolean>;
  setValue: (name: any, value: any) => void;
}

const QuestionSectionContent: React.FC<QuestionSectionContentProps> = ({
  question,
  control,
  onContinue: onContinueAsync,
  setValue,
}) => {
  const {text: questionText, type, options, min, max, step, id} = question;
  const theme = useDynamicTheme();
  const {errors} = useFormState({control});
  const fieldError = errors[id as keyof ICIQAnswers];
  const errorMessage: string | undefined =
    fieldError && typeof fieldError === 'object' && 'message' in fieldError
      ? (fieldError.message as string)
      : typeof fieldError === 'string'
      ? fieldError
      : undefined;

  const onContinueWrapper = (fieldId: keyof ICIQAnswers) => {
    onContinueAsync(fieldId as any).catch(() => {});
  };

  const {
    localValue,
    validDate,
    handleContinue,
    handleTextChange,
    handleDateChange,
    handleRadioChange,
    handleSliderChange,
    handleCheckboxGroupChange,
  } = useQuestionSection({
    question,
    control,
    onContinue: onContinueWrapper,
    setValue,
  });

  const renderInputByType = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            value={localValue as string}
            onChangeText={handleTextChange}
            placeholder="Digite sua resposta"
            error={errorMessage}
            required={question.required}
            onChange={handleTextChange}
          />
        );

      case 'date':
        return (
          <DatePickerInput
            value={validDate(localValue) ?? new Date()}
            onChange={(date: Date) => {
              handleDateChange(date.toISOString());
            }}
            onCancel={() => {}}
            modal={false}
            maximumDate={new Date()}
            mode="date"
          />
        );

      case 'radio':
        return (
          <RadioButtonGroup
            options={options || []}
            value={localValue}
            onChange={handleRadioChange}
          />
        );

      case 'slider':
        return (
          <SliderInput
            value={localValue as number}
            onValueChange={handleSliderChange}
            min={min ?? 0}
            max={max}
            step={step}
          />
        );

      case 'checkbox':
        return (
          <RadioButtonGroup
            options={options || []}
            value={localValue as string[]}
            onChange={(updated: string[] | string) => {
              const arr = Array.isArray(updated) ? updated : [updated];
              handleCheckboxGroupChange(arr);
            }}
            multiSelect={true}
          />
        );

      default:
        return null;
    }
  };

  return (
    <S.QuestionSectionWrapper>
      <S.QuestionContent>
        <Label
          typography={theme.typography.title.h5}
          color={theme.colors.gray_08}
          text={questionText}
        />
        <S.InputContainer>{renderInputByType()}</S.InputContainer>
      </S.QuestionContent>
      <S.ButtonWrapper>
        <Button text="Continuar" onPress={handleContinue} />
      </S.ButtonWrapper>
    </S.QuestionSectionWrapper>
  );
};

export default ICIQReassessmentModal;
