import AccessibilitySettings from '../../modules/config/AccessibilitySettings/AccessibilitySettings';
import MyAccount from '../../modules/config/MyAccount/MyAccount';
import TalkToUs from '../../modules/config/TalkToUs/TalkToUs';
import {Route} from '../routes';

export const configRoutes: Route[] = [
  {name: 'MyAccount', component: MyAccount},
  {name: 'AccessibilitySettings', component: AccessibilitySettings},
  {name: 'TalkToUs', component: TalkToUs},
];
