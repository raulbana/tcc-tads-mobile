import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from './src/theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import {AuthProvider} from './src/contexts/AuthContext';
if (__DEV__) {
  require('./ReactotronConfig');
}
function App(): React.ReactElement {
  const queryClient = new QueryClient();
  moment.locale('pt-br');

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Navigator />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
