import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {ParamListBase, RouteProp, Theme} from '@react-navigation/native';
import OnboardingHome from '../modules/onboarding/OnboardingHome/OnboardingHome';
import Home from '../modules/core/Home/Home';
import OnboardingQuestion from '../modules/onboarding/OnboardingQuestion/OnboardingQuestion';

export type ParamList = {
  Home: undefined;
  OnboardingHome: undefined;
  OnboardingQuestion: undefined;
};

export type RouteName = keyof ParamList;

export interface Route<Name extends RouteName = RouteName> {
  options:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, RouteName>;
        navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
        theme: Theme;
      }) => NativeStackNavigationOptions)
    | undefined;
  name: Name;
  component: React.ComponentType<any>;
  params?: ParamList[Name];
}

export type NavigationStackProp = NativeStackNavigationProp<ParamList>;

const routes: Route[] = [
  {
    name: 'Home',
    component: Home,
    options: undefined,
  },
  {
    name: 'OnboardingHome',
    component: OnboardingHome,
    options: undefined,
  },
  {
    name: 'OnboardingQuestion',
    component: OnboardingQuestion,
    options: undefined,
  },
];

export default routes;
