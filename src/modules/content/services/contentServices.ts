import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {Content, ContentCategory} from '../../../types/content';
import apiRoutes from '../../../utils/apiRoutes';

const api = apiFactory(BASE_URL);

const contentServices = {
  getById: async (contentId: string): Promise<Content> => {
    const response = await api.get(apiRoutes.content.byId(contentId));
    return response.data;
  },

  getAll: async (): Promise<Content[]> => {
    const response = await api.get(apiRoutes.content.all);
    return response.data;
  },

  getCategories: async (): Promise<ContentCategory[]> => {
    const response = await api.get(apiRoutes.content.category);
    return response.data;
  },
};

export default contentServices;
