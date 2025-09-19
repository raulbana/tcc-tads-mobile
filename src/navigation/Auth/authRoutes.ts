import {Route} from '../routes';
import Login from '../../modules/auth/services/login/Login';
import Register from '../../modules/auth/services/register/Register';

export const authRoutes: Route[] = [
  {name: 'Login', component: Login},
  {
    name: 'Register',
    component: Register,
  },
];
