import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ParamListBase, RouteProp, Theme} from '@react-navigation/native';

import BottomStack from '../components/BottomStack/BottomStack';
import AccessibilitySettings from '../modules/config/AccessibilitySettings/AccessibilitySettings';
import OnboardingStack from './Onboarding/OnboardingStack';
import ConfigStack from './Config/configStack';

export type MainTabParamList = {
  Home: undefined;
  Diary: undefined;
  Exercises: undefined;
  Contents: undefined;
  MyAccount: undefined;
};

export type OnboardingParamList = {
  OnboardingHome: undefined;
  OnboardingQuestion: undefined;
};

export type ConfigParamList = {
  MyAccount: undefined;
  AccessibilitySettings: undefined;
  TalkToUs: undefined;
};

export type RootParamList = {
  MainTabs: {screen?: keyof MainTabParamList} | undefined;
  Onboarding: {screen?: keyof OnboardingParamList} | undefined;
  Config: {screen?: keyof ConfigParamList} | undefined;
};
export interface Route<
  Name extends string = string,
  ParamList extends ParamListBase = ParamListBase,
> {
  name: Name;
  component: React.ComponentType<any>;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamList, Name>;
        navigation: NativeStackNavigationProp<ParamList, Name>;
        theme: Theme;
      }) => NativeStackNavigationOptions);
  params?: ParamList[Name];
}

const routes: Route[] = [
  {
    name: 'MainTabs',
    component: BottomStack,
    options: undefined,
  },
  {
    name: 'Onboarding',
    component: OnboardingStack,
    options: undefined,
  },
  {
    name: 'Config',
    component: ConfigStack,
    options: undefined,
  },
];

export type NavigationStackProp = NativeStackNavigationProp<RootParamList>;

export default routes;
