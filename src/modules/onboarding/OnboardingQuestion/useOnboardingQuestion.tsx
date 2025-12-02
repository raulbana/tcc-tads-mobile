import {useState, useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {ICIQAnswers, iciqSchema} from './schema/questionnaire';
import {zodResolver} from '@hookform/resolvers/zod';
import {QuestionProps} from './components/QuestionSection/QuestionSection';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import useOnboardingQueries from '../services/onboardingQueryFactory';
import {Question} from '../../../types/question';
import {useAuth} from '../../../contexts/AuthContext';
import {Gender, PatientProfile} from '../../../types/auth';

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

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

  const submitAnswersMutation = onboardingQueries.submitAnswers();

  const limitedQuestionList = useMemo(() => {
    return questionList.slice(0, 6);
  }, [questionList]);

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

  const {
    saveOfflineOnboardingData,
    saveOnboardingProfileDTO,
    saveOnboardingWorkoutPlan,
    isLoggedIn,
    user,
  } = useAuth();

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

  const onSubmitAnswer = useCallback(async () => {
    const submitForm = handleSubmit(async (answers: ICIQAnswers) => {
      const formatDateForAPI = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const formatAnswersForAPI = (): Record<string, string> => {
        const apiAnswers: Record<string, string> = {
          birthdate: formatDateForAPI(answers.birthdate),
          gender: answers.gender,
          q3_frequency: String(answers.q3_frequency),
          q4_amount: String(answers.q4_amount),
          q5_interference: String(answers.q5_interference),
        };

        if (Array.isArray(answers.q6_when) && answers.q6_when.length > 0) {
          apiAnswers.q6_when = answers.q6_when.join(',');
        }

        return apiAnswers;
      };

      const createProfileData = (): PatientProfile => {
        const iciqScore =
          answers.q3_frequency + answers.q4_amount + answers.q5_interference;
        return {
          id: generateId(),
          birthDate: answers.birthdate,
          gender: answers.gender as Gender,
          q1Score: answers.q3_frequency,
          q2Score: answers.q4_amount,
          q3Score: answers.q5_interference,
          q4Score: answers.q6_when.length,
          iciqScore,
        };
      };

      try {
        const submitData: {
          userId?: number;
          answers: Record<string, string>;
        } = {
          answers: formatAnswersForAPI(),
        };

        if (isLoggedIn && user) {
          submitData.userId = user.id;
        }

        const result = await submitAnswersMutation.mutateAsync(submitData);

        if (result.profile) {
          await saveOnboardingProfileDTO(result.profile);
        }

        if (result.workoutPlan) {
          await saveOnboardingWorkoutPlan(result.workoutPlan);
        }

        const profileData = result.profile
          ? {
              id: generateId(),
              birthDate: result.profile.birthDate,
              gender: result.profile.gender as Gender,
              q1Score: result.profile.iciq3answer,
              q2Score: result.profile.iciq4answer,
              q3Score: result.profile.iciq5answer,
              q4Score: result.profile.urinationLoss
                ? result.profile.urinationLoss.split(',').length
                : 0,
              iciqScore: result.profile.iciqScore,
            }
          : createProfileData();

        const urinationLoss = Array.isArray(answers.q6_when)
          ? answers.q6_when.join(',')
          : '';

        await saveOfflineOnboardingData(profileData, urinationLoss);

        navigate('Onboarding', {screen: 'OnboardingEnd'});
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : 'Erro ao enviar respostas.';
        setErrorMessage(errorMsg);
        setIsToastOpen(true);

        const profileData = createProfileData();

        const urinationLoss = Array.isArray(answers.q6_when)
          ? answers.q6_when.join(',')
          : '';

        await saveOfflineOnboardingData(profileData, urinationLoss);

        navigate('Onboarding', {screen: 'OnboardingEnd'});
      }
    });

    await submitForm();
  }, [
    handleSubmit,
    isLoggedIn,
    user,
    submitAnswersMutation,
    saveOfflineOnboardingData,
    saveOnboardingProfileDTO,
    saveOnboardingWorkoutPlan,
    navigate,
  ]);

  const onContinue = useCallback(
    async (field: keyof ICIQAnswers) => {
      const isFieldValid = await trigger(field);

      if (isFieldValid) {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < limitedQuestionList.length) {
          const nextQuestion = limitedQuestionList[nextIndex];
          const nextField = nextQuestion.id as keyof ICIQAnswers;
          const defaultValue = getDefaultValueForQuestion(nextQuestion);
          setValue(nextField, defaultValue);
          setCurrentQuestionIndex(nextIndex);

          if (errorMessage) {
            setErrorMessage('');
          }
        } else {
          const isFormValid = await trigger();
          if (isFormValid) {
            await onSubmitAnswer();
          } else {
            const allErrors = Object.keys(errors);
            if (allErrors.length > 0) {
              const firstErrorField = allErrors[0] as keyof ICIQAnswers;
              const {error} = getFieldState(firstErrorField);
              setErrorMessage(
                error?.message ??
                  'Por favor, preencha todos os campos corretamente',
              );
              setIsToastOpen(true);
            }
          }
        }
      } else {
        const {error} = getFieldState(field);
        setErrorMessage(error?.message ?? 'Campo inválido');
        setIsToastOpen(true);
      }
    },
    [
      trigger,
      currentQuestionIndex,
      limitedQuestionList,
      getFieldState,
      setValue,
      errorMessage,
      errors,
      onSubmitAnswer,
    ],
  );

  const onCloseToast = () => {
    setIsToastOpen(false);
    setErrorMessage('');
  };

  const navigateBack = () => {
    if (currentQuestionIndex === 0) {
      navigate('Onboarding', {screen: 'OnboardingHome'});
    } else {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const questionInputs: QuestionProps[] = limitedQuestionList.map(question => ({
    question,
    control: control,
    onContinue: () => onContinue(question.id as keyof ICIQAnswers),
    selectedValue: getValues(question.id as keyof ICIQAnswers),
    setValue: setValue,
  }));

  const clearError = () => {
    setErrorMessage('');
    setIsToastOpen(false);
  };

  return {
    currentQuestion: limitedQuestionList[currentQuestionIndex],
    isLoading: isLoading || submitAnswersMutation.isPending,
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
    clearError,
  };
};

export default useOnboardingQuestion;
