import Login from '../../modules/auth/login/Login';
import Register from '../../modules/auth/register/Register';
import {Route} from '../routes';

export const authRoutes: Route[] = [
  {name: 'Login', component: Login},
  {
    name: 'Register',
    component: Register,
  },
];
