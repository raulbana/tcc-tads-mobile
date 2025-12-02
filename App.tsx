import '@react-native-firebase/app';
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
import NotificationHandler from './src/components/NotificationHandler/NotificationHandler';
import notificationService from './src/services/notificationService';

if (__DEV__) {
  require('./ReactotronConfig');
}
export const queryClient = new QueryClient();

const AppContent = () => {
  const {isLoggedIn, isInitializing, hasOnboardingData} = useAuth();

  const getProvider = () => {
    if (isInitializing) {
      return (
        <AuthenticatedProviders>
          <Navigator />
        </AuthenticatedProviders>
      );
    }

    if (!hasOnboardingData()) {
      return (
        <FirstAccessProviders>
          <Navigator />
        </FirstAccessProviders>
      );
    }

    if (!isLoggedIn) {
      return (
        <UnauthenticatedProviders>
          <Navigator />
        </UnauthenticatedProviders>
      );
    }

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

  React.useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notificationService.initialize();
      } catch (error) {}
    };

    initializeNotifications();
    notificationService.setBackgroundMessageHandler();
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationHandler />
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
