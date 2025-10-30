import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import {AuthProvider} from './src/contexts/AuthContext';
import {AccessibilityProvider} from './src/contexts/AccessibilityContext';
import AuthenticatedProviders from './src/components/AuthenticatedProviders/AuthenticatedProviders';

if (__DEV__) {
  require('./ReactotronConfig');
}
const queryClient = new QueryClient();

const AppContent = () => {
  return <Navigator />;
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
