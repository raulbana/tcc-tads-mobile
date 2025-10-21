import {ButtonSize, ButtonType} from './Button';
import {TextProps as TypographyProps} from '../../theme';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

const useButton = () => {
  const theme = useDynamicTheme();

  const getTextColor = (type: ButtonType) => {
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

  const getBackgroundColor = (type?: ButtonType) => {
    if (type === 'PRIMARY') {
      return theme.colors.purple_04;
    } else if (type === 'SECONDARY') {
      return theme.colors.purple_02;
    } else {
      return theme.colors.white;
    }
  };

  return {getTextColor, getButtonTextSize, getBackgroundColor};
};

export default useButton;
