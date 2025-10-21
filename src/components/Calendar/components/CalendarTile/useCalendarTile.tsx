import {useDynamicTheme} from '../../../../hooks/useDynamicTheme';
import {LeakageLevel} from '../../../../types/diary';

const useCalendarTile = () => {
  const theme = useDynamicTheme();

  const getBadgeColor = (level?: LeakageLevel) => {
    switch (level) {
      case 'NONE':
        return theme.colors.gray_05;
      case 'LOW':
        return theme.colors.pastel_green;
      case 'MEDIUM':
        return theme.colors.pastel_yellow;
      case 'HIGH':
        return theme.colors.pastel_red;
      default:
        return theme.colors.gray_05;
    }
  };

  return {
    getBadgeColor,
  };
};

export default useCalendarTile;
