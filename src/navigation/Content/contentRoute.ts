import ContentDetails from '../../modules/content/ContentDetails/ContentDetails';
import ContentHome from '../../modules/content/ContentHome/ContentHome';
import CreateContent from '../../modules/content/CreateContent/CreateContent';
import {Route} from '../routes';

export const contentRoutes: Route[] = [
  {name: 'ContentHome', component: ContentHome},
  {name: 'ContentDetails', component: ContentDetails},
  {name: 'CreateContent', component: CreateContent},
];
