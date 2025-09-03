import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {onboardingRoutes} from './onboardingRoutes';
import {OnboardingParamList} from '../routes';

const Stack = createNativeStackNavigator<OnboardingParamList>();

const OnboardingStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {onboardingRoutes.map(route => (
      <Stack.Screen
        key={route.name}
        name={route.name as keyof OnboardingParamList}
        component={route.component}
      />
    ))}
  </Stack.Navigator>
);

export default OnboardingStack;
