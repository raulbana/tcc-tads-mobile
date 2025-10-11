import MyAccount from '../../modules/config/MyAccount/MyAccount';
import ContentHome from '../../modules/content/ContentHome/ContentHome';
import Home from '../../modules/core/Home/Home';
import Diary from '../../modules/diary/Diary';
import ExercisesStack from '../Exercises/exercisesStack';
import {Route} from '../routes';

export const mainTabRoutes: Route[] = [
  {name: 'Home', component: Home},
  {name: 'Diary', component: Diary},
  {name: 'Exercises', component: ExercisesStack},
  {name: 'Contents', component: ContentHome},
  {name: 'MyAccount', component: MyAccount},
];
