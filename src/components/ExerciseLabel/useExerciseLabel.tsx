import theme from '../../theme/theme';
import {ExerciseStatus} from '../../types/exercise';

const useExerciseLabel = () => {
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

  return {
    getLabel,
    getLabelColor,
  };
};

export default useExerciseLabel;
