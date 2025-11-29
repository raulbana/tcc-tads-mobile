import AccessibilitySettings from '../../modules/config/AccessibilitySettings/AccessibilitySettings';
import MyAccount from '../../modules/config/MyAccount/MyAccount';
import TalkToUs from '../../modules/config/TalkToUs/TalkToUs';
import EditProfile from '../../modules/config/EditProfile/EditProfile';
import Profile from '../../modules/config/Profile/Profile';
import EditContent from '../../modules/config/EditContent/EditContent';
import AboutApp from '../../modules/config/AboutApp/AboutApp';
import {Route} from '../routes';

export const configRoutes: Route[] = [
  {name: 'MyAccount', component: MyAccount},
  {name: 'AccessibilitySettings', component: AccessibilitySettings},
  {name: 'TalkToUs', component: TalkToUs},
  {name: 'EditProfile', component: EditProfile},
  {name: 'Profile', component: Profile},
  {name: 'EditContent', component: EditContent},
  {name: 'AboutApp', component: AboutApp},
];
