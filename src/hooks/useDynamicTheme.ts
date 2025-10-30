import {useTheme} from 'styled-components/native';

export const useDynamicTheme = () => {
  const theme = useTheme();

  return {
    ...theme,
    colors: {...theme.colors},
    typography: {...theme.typography},
    fonts: {...theme.fonts},
  };
};
