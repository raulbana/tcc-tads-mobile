import 'styled-components';

import colors from './colors';
import typography from './typography';
import fonts from './fonts';

type ThemeType = {
  key?: 'default' | 'high-contrast' | 'dark';
  colors: typeof colors;
  typography: typeof typography;
  fonts: typeof fonts;
};

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
