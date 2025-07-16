import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from './src/theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
if (__DEV__) {
  require('./ReactotronConfig');
}
function App(): React.ReactElement {
  const queryClient = new QueryClient();
  moment.locale('pt-br');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
