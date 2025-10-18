import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from './src/theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import {AuthProvider} from './src/contexts/AuthContext';
import {DiaryProvider} from './src/contexts/DiaryContext';
if (__DEV__) {
  require('./ReactotronConfig');
}
const queryClient = new QueryClient();

function App(): React.ReactElement {
  moment.locale('pt-br');

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DiaryProvider>
            <ThemeProvider theme={theme}>
              <Navigator />
            </ThemeProvider>
          </DiaryProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
