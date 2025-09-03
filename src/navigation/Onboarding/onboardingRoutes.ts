import OnboardingHome from '../../modules/onboarding/OnboardingHome/OnboardingHome';
import OnboardingQuestion from '../../modules/onboarding/OnboardingQuestion/OnboardingQuestion';
import {Route} from '../routes';

export const onboardingRoutes: Route[] = [
  {name: 'OnboardingHome', component: OnboardingHome},
  {name: 'OnboardingQuestion', component: OnboardingQuestion},
];
