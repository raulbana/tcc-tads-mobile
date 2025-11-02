import OnboardingHome from '../../modules/onboarding/OnboardingHome/OnboardingHome';
import OnboardingQuestion from '../../modules/onboarding/OnboardingQuestion/OnboardingQuestion';
import CadastroOuAnonimo from '../../modules/onboarding/CadastroOuAnonimo/CadastroOuAnonimo';
import {Route} from '../routes';

export const onboardingRoutes: Route[] = [
  {name: 'OnboardingHome', component: OnboardingHome},
  {name: 'OnboardingQuestion', component: OnboardingQuestion},
  {name: 'CadastroOuAnonimo', component: CadastroOuAnonimo},
];
