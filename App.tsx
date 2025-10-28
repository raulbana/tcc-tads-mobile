import React, {useMemo} from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from './src/theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import {AuthProvider} from './src/contexts/AuthContext';
import {
  AccessibilityProvider,
  useAccessibility,
} from './src/contexts/AccessibilityContext';
import AuthenticatedProviders from './src/components/AuthenticatedProviders/AuthenticatedProviders';
import {accessibleColors} from './src/theme/accessibleColors';
import {accessibleTypography} from './src/theme/accessibleTypography';
import colors from './src/theme/colors';
import fonts from './src/theme/fonts';
import typography from './src/theme/typography';

if (__DEV__) {
  require('./ReactotronConfig');
}
const queryClient = new QueryClient();

const AppContent = () => {
  const {highContrast, bigFont} = useAccessibility();

  const currentTheme = useMemo(
    () => ({
      colors: highContrast ? accessibleColors : colors,
      typography: bigFont ? accessibleTypography : typography,
      fonts,
    }),
    [highContrast, bigFont],
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <Navigator />
    </ThemeProvider>
  );
};

function App(): React.ReactElement {
  moment.locale('pt-br');

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AccessibilityProvider>
            <AuthenticatedProviders>
              <AppContent />
            </AuthenticatedProviders>
          </AccessibilityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
