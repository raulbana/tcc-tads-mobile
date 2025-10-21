import {ButtonSize, ButtonType} from './Button';
import {TextProps as TypographyProps} from '../../theme';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

const useButton = () => {
  
  const getTextColor = (type: ButtonType) => {
    const theme = useDynamicTheme();
    switch (type) {
      case 'PRIMARY':
        return theme.colors.gray_01;
      case 'SECONDARY':
        return theme.colors.purple_04;
      case 'TERTIARY':
        return theme.colors.gray_08;
      default:
        return theme.colors.gray_08;
    }
  };

  const getButtonTextSize = (size: ButtonSize): TypographyProps => {
    const theme = useDynamicTheme();
    switch (size) {
      case 'SMALL':
        return theme.typography.paragraph.sb2;
      case 'MEDIUM':
        return theme.typography.paragraph.sb3;
      case 'LARGE':
        return theme.typography.paragraph.sb4;
      default:
        return theme.typography.paragraph.sb3;
    }
  };

  return {getTextColor, getButtonTextSize};
};

export default useButton;
