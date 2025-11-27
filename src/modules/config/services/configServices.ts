import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {
  ContactRequest,
  ContactResponse,
  AccessibilityPreferences,
  EditProfileRequest,
  EditProfileResponse,
} from '../../../types/config';
import apiRoutes from '../../../utils/apiRoutes';
import mediaServices from '../../content/services/mediaServices';

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

  editProfile: async (
    userId: number,
    data: EditProfileRequest,
    profilePictureUri?: string,
  ): Promise<EditProfileResponse> => {
    let profilePicture = data.profilePicture;

    // Se houver uma nova imagem (URI local), fazer upload primeiro
    if (profilePictureUri && !profilePictureUri.startsWith('http')) {
      try {
        const uploadedMedia = await mediaServices.uploadImage(profilePictureUri);
        profilePicture = {
          id: uploadedMedia.id,
          url: uploadedMedia.url,
          contentType: uploadedMedia.contentType,
          contentSize: uploadedMedia.contentSize,
          altText: uploadedMedia.altText || 'Profile picture',
          createdAt: uploadedMedia.createdAt,
        };
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        throw new Error('Falha ao fazer upload da imagem de perfil');
      }
    }

    const requestData: EditProfileRequest = {
      name: data.name,
      email: data.email,
      ...(profilePicture && {profilePicture}),
    };

    const response = await apiInstance.put(
      apiRoutes.config.editProfile(userId),
      requestData,
    );
    return response.data;
  },
};

export default configServices;
