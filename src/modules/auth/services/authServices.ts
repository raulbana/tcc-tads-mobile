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
} from '../../../types/auth';
import apiRoutes from '../../../utils/apiRoutes';

const apiInstance = apiFactory(BASE_URL);

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
      data,
    );
    return response.data;
  },

  forgotPasswordValidate: async (data: forgotPasswordValidateRequest): Promise<forgotPasswordValidateResponse> => {
    const response = await apiInstance.post(
      apiRoutes.authentication.forgotPasswordValidate,
      data,
    );
    return response.data;
  },
};

export default authServices;
