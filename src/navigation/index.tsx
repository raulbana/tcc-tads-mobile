import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes, {ParamList} from './routes';

const Stack = createNativeStackNavigator<ParamList>();
export type StackScreenProps = React.ComponentProps<typeof Stack.Screen>;

const Navigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{headerShown: false}}>
      {routes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Navigator;
