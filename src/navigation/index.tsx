import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

const Stack = createNativeStackNavigator();

export type StackScreenProps = React.ComponentProps<typeof Stack.Screen>;

const Navigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
