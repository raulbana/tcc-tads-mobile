import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes, {RootParamList} from './routes';

const Stack = createNativeStackNavigator<RootParamList>();
export type StackScreenProps = React.ComponentProps<typeof Stack.Screen>;

const Navigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
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
