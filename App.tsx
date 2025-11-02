import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import AuthenticatedProviders from './src/components/AuthenticatedProviders/AuthenticatedProviders';
import UnauthenticatedProviders from './src/components/UnauthenticatedProviders/UnauthenticatedProviders';
import FirstAccessProviders from './src/components/FirstAccessProviders/FirstAccessProviders';

if (__DEV__) {
  require('./ReactotronConfig');
}
const queryClient = new QueryClient();

const AppContent = () => {
  const {isLoggedIn, isInitializing, hasOnboardingData} = useAuth();

  const getProvider = () => {
    if (isInitializing) {
      console.log('isInitializing');
      return (
        <AuthenticatedProviders>
          <Navigator />
        </AuthenticatedProviders>
      );
    }

    if (!hasOnboardingData()) {
      console.log('hasOnboardingData');
      return (
        <FirstAccessProviders>
          <Navigator />
        </FirstAccessProviders>
      );
    }

    if (!isLoggedIn) {
      console.log('!isLoggedIn');
      return (
        <UnauthenticatedProviders>
          <Navigator />
        </UnauthenticatedProviders>
      );
    }

    console.log('AuthenticatedProviders');
    return (
      <AuthenticatedProviders>
        <Navigator />
      </AuthenticatedProviders>
    );
  };

  return getProvider();
};

function App(): React.ReactElement {
  moment.locale('pt-br');

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
