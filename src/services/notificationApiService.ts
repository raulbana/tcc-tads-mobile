import {BASE_URL} from '@env';
import apiFactory from './apiFactory';
import apiRoutes from '../utils/apiRoutes';

const apiInstance = apiFactory(BASE_URL);

const notificationApiService = {
  registerToken: async (token: string, userId: number): Promise<void> => {
    await apiInstance.post(apiRoutes.notifications.register, {
      token,
      userId,
    });
  },

  updateToken: async (token: string, userId: number): Promise<void> => {
    await apiInstance.patch(apiRoutes.notifications.update, {
      token,
      userId,
    });
  },

  removeToken: async (userId: number): Promise<void> => {
    await apiInstance.delete(apiRoutes.notifications.remove, {
      params: {userId},
    });
  },
};

export default notificationApiService;

