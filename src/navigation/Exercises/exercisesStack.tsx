import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExercisesParamList} from '../routes';
import {exercisesRoutes} from './exercisesRoute';

const Stack = createNativeStackNavigator<ExercisesParamList>();

const ExercisesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ExercisesHome">
      {exercisesRoutes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name as keyof ExercisesParamList}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ExercisesStack;
