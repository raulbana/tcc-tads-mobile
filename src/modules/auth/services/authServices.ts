import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {
  forgotPasswordRequestRequest,
  forgotPasswordRequestResponse,
  forgotPasswordValidateRequest,
  forgotPasswordValidateResponse,
  loginRequest,
  loginResponse,
  registerRequest,
  registerResponse,
  updateUserRequest,
  updateUserResponse,
  getUserByIdResponse,
} from '../../../types/auth';
import apiRoutes from '../../../utils/apiRoutes';

const apiInstance = apiFactory('http://192.168.15.12:8080/v1');

const authServices = {
  login: async (data: loginRequest): Promise<loginResponse> => {
    const response = await apiInstance.post(
      apiRoutes.authentication.login,
      data,
    );
    return response.data;
  },
  
  register: async (data: registerRequest): Promise<registerResponse> => {
    const response = await apiInstance.post(
      apiRoutes.authentication.register,
      data,
    );
    return response.data;
  },

  forgotPasswordRequest: async (data: forgotPasswordRequestRequest): Promise<forgotPasswordRequestResponse> => {
    const response = await apiInstance.post(
      apiRoutes.authentication.forgotPasswordRequest,
      {}, // Body vazio pois o email vai no header
      {
        headers: {
          'x-user-email': data.email,
        },
      },
    );
    return response.data;
  },

  forgotPasswordReset: async (data: forgotPasswordValidateRequest): Promise<forgotPasswordValidateResponse> => {
    const response = await apiInstance.post(
      apiRoutes.authentication.forgotPasswordReset,
      data,
    );
    return response.data;
  },

  updateUser: async (data: updateUserRequest): Promise<updateUserResponse> => {
    const response = await apiInstance.put(
      apiRoutes.authentication.updateUser,
      data,
    );
    return response.data;
  },

  getUserById: async (id: number): Promise<getUserByIdResponse> => {
    const response = await apiInstance.get(
      apiRoutes.authentication.getUserById(id),
    );
    return response.data;
  },
};

export default authServices;
