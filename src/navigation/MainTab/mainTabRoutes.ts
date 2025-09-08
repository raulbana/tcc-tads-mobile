import MyAccount from '../../modules/config/MyAccount/MyAccount';
import Home from '../../modules/core/Home/Home';
import Diary from '../../modules/diary/Diary';
import {Route} from '../routes';

const placeholder = () => null;

export const mainTabRoutes: Route[] = [
  {name: 'Home', component: Home},
  {name: 'Diary', component: Diary},
  {name: 'Exercises', component: placeholder},
  {name: 'Contents', component: placeholder},
  {name: 'MyAccount', component: MyAccount},
];
