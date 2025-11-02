import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes, {RootParamList} from './routes';
import {useAuth} from '../contexts/AuthContext';

const Stack = createNativeStackNavigator<RootParamList>();
export type StackScreenProps = React.ComponentProps<typeof Stack.Screen>;

const Navigator: React.FC = () => {
  const {isLoggedIn, isInitializing, hasOnboardingData} = useAuth();

  const initialRouteName = useMemo(() => {
    if (!hasOnboardingData()) {
      return 'Onboarding';
    }

    if (isInitializing) {
      return 'Auth';
    }

    if (!isLoggedIn) {
      return 'MainTabs';
    }

    return 'MainTabs';
  }, [isLoggedIn, isInitializing, hasOnboardingData]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName as keyof RootParamList}
      screenOptions={{headerShown: false}}>
      {routes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name as keyof RootParamList}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Navigator;
