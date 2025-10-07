import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContentParamList} from '../routes';
import {contentRoutes} from './contentRoute';

const Stack = createNativeStackNavigator<ContentParamList>();

const ContentStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="CreateContent">
    {contentRoutes.map(route => (
      <Stack.Screen
        key={route.name}
        name={route.name as keyof ContentParamList}
        component={route.component}
      />
    ))}
  </Stack.Navigator>
);

export default ContentStack;
