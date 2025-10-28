import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes, {RootParamList} from './routes';
import {useAuth} from '../contexts/AuthContext';

const Stack = createNativeStackNavigator<RootParamList>();
export type StackScreenProps = React.ComponentProps<typeof Stack.Screen>;

const Navigator: React.FC = () => {
  const {isLoggedIn, isInitializing} = useAuth();

  // Determinar a rota inicial baseado no estado de autenticação
  // Apenas usado na montagem inicial do componente
  const initialRouteName = useMemo(() => {
    // Sempre começa com Auth e deixa o AuthContext gerenciar a navegação
    return 'Auth';
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      {routes.map(route => (
        <Stack.Screen
          key={route.name as keyof RootParamList}
          name={route.name as keyof RootParamList}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Navigator;
