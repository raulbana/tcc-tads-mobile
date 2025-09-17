import ContentDetails from '../../modules/content/ContentDetails/ContentDetails';
import ContentHome from '../../modules/content/ContentHome/ContentHome';
import {Route} from '../routes';

export const contentRoutes: Route[] = [
  {name: 'ContentHome', component: ContentHome},
  {name: 'ContentDetails', component: ContentDetails},
];
