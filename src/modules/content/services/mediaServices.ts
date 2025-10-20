import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {MediaDTO} from '../../../types/content';

const api = apiFactory(BASE_URL);

const mediaServices = {
  uploadImage: async (imageUri: string): Promise<MediaDTO> => {
    const formData = new FormData();
    const filename = imageUri.split('/').pop() || 'image.jpg';
    
    formData.append('file', {
      uri: imageUri,
      name: filename,
      type: 'image/jpeg',
    } as any);

    const response = await api.post(apiRoutes.media.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  uploadVideo: async (videoUri: string): Promise<MediaDTO> => {
    const formData = new FormData();
    const filename = videoUri.split('/').pop() || 'video.mp4';
    
    formData.append('file', {
      uri: videoUri,
      name: filename,
      type: 'video/mp4',
    } as any);

    const response = await api.post(apiRoutes.media.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export default mediaServices;
