import {useState, useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ICIQAnswers, iciqSchema} from './schema/questionnaire';
import {zodResolver} from '@hookform/resolvers/zod';
import {QuestionProps} from './components/QuestionSection/QuestionSection';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import useOnboardingQueries from '../services/onboardingQueryFactory';
import {Question} from '../../../types/question';

const useOnboardingQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onboardingQueries = useOnboardingQueries(['onboarding', 'questions']);
  const {
    data: questionList = [],
    isLoading,
    error,
  } = onboardingQueries.getQuestions();

  const {navigate} = useNavigation<NavigationStackProp>();

  useEffect(() => {
    if (error && !isToastOpen) {
      setErrorMessage(
        'Erro ao carregar perguntas. Tente novamente mais tarde.',
      );
      setIsToastOpen(true);
    }
  }, [error, isToastOpen]);

  const {
    handleSubmit,
    control,
    getFieldState,
    getValues,
    trigger,
    setValue,
    formState: {errors, isValid},
  } = useForm<ICIQAnswers>({
    resolver: zodResolver(iciqSchema),
    mode: 'onChange',
    defaultValues: {
      birthdate: new Date().toISOString(),
      gender: '',
      q3_frequency: 0,
      q4_amount: 0,
      q5_interference: 0,
      q6_when: [],
    },
  });

  const getDefaultValueForQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return '';
      case 'date':
        return new Date().toISOString();
      case 'slider':
        return question.min || 0;
      case 'radio':
        return '';
      case 'checkbox':
        return [];
      default:
        return '';
    }
  };

  const onContinue = useCallback(
    async (field: keyof ICIQAnswers) => {
      const isFieldValid = await trigger(field);

      if (isFieldValid) {
        setCurrentQuestionIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < questionList.length) {
            const nextQuestion = questionList[nextIndex];
            const nextField = nextQuestion.id as keyof ICIQAnswers;
            const defaultValue = getDefaultValueForQuestion(nextQuestion);
            setValue(nextField, defaultValue);
            return nextIndex;
          } else {
            onSubmitAnswer();
            return prevIndex;
          }
        });

        // Limpar erro ao avançar
        if (errorMessage) {
          setErrorMessage('');
        }
      } else {
        const {error} = getFieldState(field);
        setErrorMessage(error?.message ?? 'Campo inválido');
        setIsToastOpen(true);
      }
    },
    [getValues, trigger, questionList, getFieldState, setValue, errorMessage],
  );

  const onCloseToast = () => {
    setIsToastOpen(false);
    setErrorMessage('');
  };

  const onSubmitAnswer = useCallback(() => {
    console.log(getValues());
    handleSubmit(() => {
      console.log({
        ...getValues(),
        isValid,
      });
    });
  }, [getValues, handleSubmit, isValid]);

  const navigateBack = () => {
    if (currentQuestionIndex === 0) {
      navigate('OnboardingHome');
    } else {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const questionInputs: QuestionProps[] = questionList.map(question => ({
    question,
    control: control,
    onContinue: () => onContinue(question.id as keyof ICIQAnswers),
    selectedValue: getValues(question.id as keyof ICIQAnswers),
    setValue: setValue, // Adicionar esta linha
  }));

  const clearError = () => {
    setErrorMessage('');
    setIsToastOpen(false);
  };

  return {
    currentQuestion: questionList[currentQuestionIndex],
    isLoading,
    isValid,
    onContinue,
    handleSubmit,
    control,
    onSubmitAnswer,
    errors,
    questionInputs,
    currentQuestionIndex,
    isToastOpen,
    errorMessage,
    onCloseToast,
    navigateBack,
    clearError, // Adicionar esta linha
  };
};

export default useOnboardingQuestion;
