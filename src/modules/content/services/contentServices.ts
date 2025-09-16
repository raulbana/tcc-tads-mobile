import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {Content, ContentCategory} from '../../../types/content';

const api = apiFactory(BASE_URL);

const contentServices = {
  getById: async (contentId: string): Promise<Content> => {
    const response = await api.get(`/contents/${contentId}`);
    return response.data;
  },

  getAll: async (): Promise<Content[]> => {
    const response = await api.get('/contents');
    return response.data;
  },

  getCategories: async (): Promise<ContentCategory[]> => {
    const response = await api.get('/contents/categories');
    return response.data;
  },
};

export default contentServices;
