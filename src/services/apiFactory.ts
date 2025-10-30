import axios from "axios";
import {MMKVStorage} from "../storage/mmkvStorage";

const AUTH_TOKEN_KEY = 'auth_token_v1';
const LOGGED_USER_KEY = 'auth_user_v1';

const apiFactory = (baseURL: string) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiInstance.interceptors.request.use(
    (config) => {
      const token = MMKVStorage.getString(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const userData = MMKVStorage.getString(LOGGED_USER_KEY);
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user?.id) {
            config.headers['x-user-id'] = user.id.toString();
          }
        } catch (error) {
          console.warn('Erro ao parsear dados do usuário:', error);
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        console.error('API Error:', error.response.data);
        
        if (error.response.status === 401) {
          console.warn('Token inválido ou expirado, limpando dados de autenticação');
          MMKVStorage.delete(AUTH_TOKEN_KEY);
          MMKVStorage.delete('auth_user_v1');
        }
      }

      if (error instanceof Error) {
        return Promise.reject(error);
      } else {
        return Promise.reject(new Error(typeof error === 'string' ? error : JSON.stringify(error)));
      }
    }
  );

  return apiInstance;
};

export default apiFactory;