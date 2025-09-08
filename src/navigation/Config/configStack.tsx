import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ConfigParamList} from '../routes';
import {configRoutes} from './configRoutes';

const Stack = createNativeStackNavigator<ConfigParamList>();

const ConfigStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {configRoutes.map(route => (
      <Stack.Screen
        key={route.name}
        name={route.name as keyof ConfigParamList}
        component={route.component}
      />
    ))}
  </Stack.Navigator>
);

export default ConfigStack;
