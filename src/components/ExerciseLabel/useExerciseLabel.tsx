import {ExerciseStatus} from '../../types/exercise';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

const useExerciseLabel = () => {
  const theme = useDynamicTheme();

  const getLabel = (status: ExerciseStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'Concluído';
      case 'PENDING':
        return 'Pendente';
      case 'IN_PROGRESS':
        return 'Em Andamento';
      default:
        return 'Status Desconhecido';
    }
  };

  const getLabelColor = (status: ExerciseStatus) => {
    switch (status) {
      case 'COMPLETED':
        return theme.colors.white;
      case 'PENDING':
        return theme.colors.purple_04;
      case 'IN_PROGRESS':
        return theme.colors.white;
      default:
        return theme.colors.purple_04;
    }
  };

  const getBackgroundColor = (status: ExerciseStatus) => {
    switch (status) {
      case 'COMPLETED':
        return theme.colors.purple_03;
      case 'PENDING':
        return theme.colors.purple_02;
      case 'IN_PROGRESS':
        return theme.colors.purple_04;
      default:
        return theme.colors.purple_01;
    }
  };

  return {
    getLabel,
    getLabelColor,
    getBackgroundColor,
  };
};

export default useExerciseLabel;
