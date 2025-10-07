import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthParamList} from '../routes';
import {authRoutes} from './authRoutes';

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Login">
    {authRoutes.map(route => (
      <Stack.Screen
        key={route.name}
        name={route.name as keyof AuthParamList}
        component={route.component}
      />
    ))}
  </Stack.Navigator>
);

export default AuthStack;
