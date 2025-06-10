import Home from '../screens/Home/Home';

type ParamList = {
  Home: undefined;
};

export type RouteName = keyof ParamList;

export interface Route<Name extends RouteName = RouteName> {
  options: NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, "Home">; navigation: NativeStackNavigationProp<ParamListBase, string, undefined>; theme: Theme; }) => NativeStackNavigationOptions) | undefined;
  name: Name;
  component: React.ComponentType<any>;
  params?: ParamList[Name];
}

const routes: Route[] = [{name: 'Home', component: Home}];

export default routes;
