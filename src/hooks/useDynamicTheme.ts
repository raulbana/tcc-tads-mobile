import {useTheme} from 'styled-components/native';

export const useDynamicTheme = () => {
  const theme = useTheme();
  return theme;
};