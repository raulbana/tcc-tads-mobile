import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  ParamListBase,
  RouteProp,
  Theme,
  NavigatorScreenParams,
} from '@react-navigation/native';
import BottomStack from '../components/BottomStack/BottomStack';
import OnboardingStack from './Onboarding/OnboardingStack';
import ConfigStack from './Config/configStack';
import ContentStack from './Content/contentStack';
import AuthStack from './Auth/authStack';
import ExercisesStack from './Exercises/exercisesStack';
import {Workout} from '../types/exercise';

export type MainTabParamList = {
  Home: undefined;
  Diary: {selectedDate?: string} | undefined;
  Exercises: undefined;
  Contents: undefined;
  MyAccount: undefined;
};

export type OnboardingParamList = {
  OnboardingHome: undefined;
  OnboardingQuestion: undefined;
  OnboardingEnd: undefined;
};

export type ConfigParamList = {
  MyAccount: undefined;
  AccessibilitySettings: undefined;
  TalkToUs: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  AboutApp: undefined;
  EditContent: {contentId: string};
};

export type ContentParamList = {
  ContentHome: undefined;
  ContentDetails: {contentId: string};
  CreateContent: undefined;
};

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type ExercisesParamList = {
  ExercisesHome: undefined;
  ExerciseDetails: {workout: Workout};
  EvaluateExercise: {exerciseId: string};
  ExerciseWorkout: {workout: Workout};
};

export type RootParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Onboarding: NavigatorScreenParams<OnboardingParamList> | undefined;
  Config: NavigatorScreenParams<ConfigParamList> | undefined;
  Content: NavigatorScreenParams<ContentParamList> | undefined;
  Auth: NavigatorScreenParams<AuthParamList> | undefined;
  Exercises: NavigatorScreenParams<ExercisesParamList> | undefined;
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
  {
    name: 'Content',
    component: ContentStack,
    options: undefined,
  },
  {
    name: 'Auth',
    component: AuthStack,
    options: undefined,
  },
  {
    name: 'Exercises',
    component: ExercisesStack,
    options: undefined,
  },
];

export type NavigationStackProp = NativeStackNavigationProp<RootParamList>;

export default routes;
