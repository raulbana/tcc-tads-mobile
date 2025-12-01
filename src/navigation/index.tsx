import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes, {RootParamList} from './routes';
import {useAuth} from '../contexts/AuthContext';

const Stack = createNativeStackNavigator<RootParamList>();
export type StackScreenProps = React.ComponentProps<typeof Stack.Screen>;

const Navigator: React.FC = () => {
  const {isLoggedIn, isInitializing, hasOnboardingData} = useAuth();

  const initialRouteName = useMemo(() => {
    // Se está inicializando mas o usuário já está logado (baseado no estado inicial),
    // começar na MainTabs para evitar mostrar a tela de login
    if (isInitializing && isLoggedIn) {
      return 'MainTabs';
    }
    
    // Se está inicializando e não está logado, mostrar Auth (mas isso só acontece
    // se não houver token/usuário salvo, então é seguro)
    if (isInitializing) {
      return 'Auth';
    }
    
    // Se o usuário está logado, não redirecionar para onboarding
    // mesmo se hasOnboardingData() retornar false (pode ser um problema temporário)
    if (isLoggedIn) {
      return 'MainTabs';
    }
    
    // Só verificar onboarding se não estiver logado
    if (!hasOnboardingData()) {
      return 'Onboarding';
    }

    if (!isLoggedIn) {
      return 'Auth';
    }

    return 'MainTabs';
  }, [isLoggedIn, isInitializing, hasOnboardingData]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName as keyof RootParamList}
      screenOptions={{headerShown: false}}>
      {routes.map(route => {
        // Desabilitar gesto de voltar na MainTabs quando logado
        const screenOptions =
          route.name === 'MainTabs' && isLoggedIn
            ? {
                gestureEnabled: false,
                headerBackVisible: false,
              }
            : undefined;

        return (
          <Stack.Screen
            key={route.name}
            name={route.name as keyof RootParamList}
            component={route.component}
            options={screenOptions || route.options}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default Navigator;
