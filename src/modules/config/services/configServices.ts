import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {
  ContactRequest,
  ContactResponse,
  AccessibilityPreferences,
} from '../../../types/config';
import apiRoutes from '../../../utils/apiRoutes';

const apiInstance = apiFactory(BASE_URL);

const configServices = {
  sendContactEmail: async (data: ContactRequest): Promise<ContactResponse> => {
    const response = await apiInstance.post(
      apiRoutes.config.contact.support,
      data,
    );
    return response.data;
  },

  getAccessibilityPreferences: async (
    userId: number,
  ): Promise<AccessibilityPreferences> => {
    const response = await apiInstance.get(
      apiRoutes.config.preferences.accessibility,
      {
        headers: {
          'x-user-id': userId.toString(),
        },
      },
    );
    return response.data;
  },

  updateAccessibilityPreferences: async (
    userId: number,
    preferences: AccessibilityPreferences,
  ): Promise<AccessibilityPreferences> => {
    const response = await apiInstance.patch(
      apiRoutes.config.preferences.accessibility,
      preferences,
      {
        headers: {
          'x-user-id': userId.toString(),
        },
      },
    );
    return response.data;
  },
};

export default configServices;
