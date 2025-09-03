import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../routes';
import {mainTabRoutes} from './mainTabRoutes';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    {mainTabRoutes.map(route => (
      <Tab.Screen
        key={route.name}
        name={route.name as keyof MainTabParamList}
        component={route.component}
      />
    ))}
  </Tab.Navigator>
);

export default MainTabNavigator;
