import {View, Text} from 'react-native';
import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import useExerciseWorkout from './useExerciseWorkout';
import StartWorkout from './components/StartWorkout/StartWorkout';
import ExercisePractice from './components/ExercisePractice/ExercisePractice';
import EvaluateExercise from './components/EvaluateExercise/EvaluateExercise';

const ExerciseWorkout = () => {
  const {
    step,
    workout,
    currentExercise,
    scrollRef,
    scrollToTop,
    onStartWorkout,
    onLeaveWorkout,
    onEvaluate,
    onNextExercise,
    onPreviousExercise,
  } = useExerciseWorkout();
  return (
    <ScreenContainer scrollable={step !== 'EXERCISE'} ref={scrollRef}>
      {step === 'START_WORKOUT' && workout && (
        <StartWorkout workout={workout} onStartWorkout={onStartWorkout} />
      )}
      {step === 'EXERCISE' && workout && currentExercise && (
        <ExercisePractice
          workout={workout}
          currentExercise={currentExercise}
          onNextExercise={onNextExercise}
          onPreviousExercise={onPreviousExercise}
          onLeaveWorkout={onLeaveWorkout}
        />
      )}
      {step === 'EVALUATE' && workout && currentExercise && (
        <EvaluateExercise
          workout={workout}
          currentExercise={currentExercise}
          onContinue={onEvaluate}
          scrollToTop={scrollToTop}
        />
      )}
    </ScreenContainer>
  );
};

export default ExerciseWorkout;
