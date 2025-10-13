import {useState} from 'react';
import {Exercise, Workout} from '../../../../../types/exercise';

type TabType = 'VIDEO' | 'ILLUSTRATION';

interface UseExercisePracticeProps {
  workout: Workout;
  currentExercise: Exercise;
  onNextExercise: () => void;
  onPreviousExercise: () => void;
  onLeaveWorkout: () => void;
}

const useExercisePractice = ({
  workout,
  currentExercise,
  onNextExercise,
  onPreviousExercise,
  onLeaveWorkout,
}: UseExercisePracticeProps) => {
  const [currentTab, setCurrentTab] = useState<TabType>('VIDEO');
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleVideoPlayPause = () => {
    setIsVideoPaused(!isVideoPaused);
  };

  const currentExerciseIndex = workout.exercises.findIndex(
    exercise => exercise.id === currentExercise.id,
  );
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;


  const handleNextImage = () => {
    const imagesLength = currentExercise.media?.images?.length ?? 0;
    if (currentImageIndex < imagesLength - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };


  const handlePreviousImage = () => {
    const imagesLength = currentExercise.media?.images?.length ?? 0;
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(imagesLength - 1);
    }
  };
  return {
    currentTab,
    setCurrentTab,
    isVideoPaused,
    toggleVideoPlayPause,
    isLastExercise,
    currentExerciseIndex,
    currentImageIndex,
    handleNextImage,
    handlePreviousImage,
  };
};

export default useExercisePractice;
