import React from 'react';
import MyAccount from '../../modules/config/MyAccount/MyAccount';
import Home from '../../modules/core/Home/Home';
import Diary from '../../modules/diary/Diary';
import {Route} from '../routes';

export const mainTabRoutes: Route[] = [
  {name: 'Home', component: Home},
  {name: 'Diary', component: Diary},
  {name: 'Exercises', component: React.Fragment},
  {name: 'Contents', component: React.Fragment},
  {name: 'MyAccount', component: MyAccount},
];
