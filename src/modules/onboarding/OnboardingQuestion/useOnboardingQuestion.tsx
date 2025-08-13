import {useState, useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ICIQAnswers, iciqSchema} from './schema/questionnaire';
import {zodResolver} from '@hookform/resolvers/zod';
import {QuestionProps} from './components/QuestionSection/QuestionSection';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import useOnboardingQueries from '../services/onboardingQueryFactory';

const useOnboardingQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {getQuestions} = useOnboardingQueries(['onboarding', 'questions']);
  const {data: questionList = [], isLoading, error} = getQuestions();

  const {navigate} = useNavigation<NavigationStackProp>();

  useEffect(() => {
    if (error && !isToastOpen) {
      setErrorMessage('Erro ao carregar perguntas. Tente novamente mais tarde.');
      setIsToastOpen(true);
    }
  }, [error, isToastOpen]);

  const {
    handleSubmit,
    control,
    getFieldState,
    getValues,
    trigger,
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

  const onContinue = useCallback(
    async (field: keyof ICIQAnswers) => {
      const isFieldValid = await trigger(field);

      if (isFieldValid) {
        setCurrentQuestionIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < questionList.length) {
            return nextIndex;
          } else {
            onSubmitAnswer();
            return prevIndex;
          }
        });
      } else {
        const {error} = getFieldState(field);
        setErrorMessage(error?.message ?? 'Campo inválido');
        setIsToastOpen(true);
      }
    },
    [getValues, trigger, questionList.length, getFieldState],
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
  }));

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
  };
};

export default useOnboardingQuestion;
