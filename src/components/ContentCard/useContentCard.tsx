import {useMemo} from 'react';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';
import {useAccessibility} from '../../contexts/AccessibilityContext';

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const useContentCard = () => {
  const theme = useDynamicTheme();
  const {highContrast, darkMode} = useAccessibility();

  const gradientColors = useMemo(() => {
    const baseColor = theme.colors.gray_08;

    if (highContrast) {
      return [
        hexToRgba(baseColor, 0.95),
        hexToRgba(baseColor, 0.5),
        hexToRgba(baseColor, 0),
      ];
    } else if (darkMode) {
      return [
        hexToRgba(baseColor, 0.9),
        hexToRgba(baseColor, 0.4),
        hexToRgba(baseColor, 0),
      ];
    } else {
      return [
        hexToRgba(baseColor, 0.85),
        hexToRgba(baseColor, 0.35),
        hexToRgba(baseColor, 0),
      ];
    }
  }, [theme.colors.gray_08, highContrast, darkMode]);

  const textColor = useMemo(() => {
    if (highContrast) {
      return theme.colors.gray_01;
    } else if (darkMode) {
      return theme.colors.gray_01;
    } else {
      return theme.colors.white;
    }
  }, [highContrast, darkMode, theme.colors.gray_01, theme.colors.white]);

  return {
    gradientColors,
    textColor,
    theme,
  };
};
