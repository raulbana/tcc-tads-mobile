import axios from "axios";
import {MMKVStorage} from "../storage/mmkvStorage";

const AUTH_TOKEN_KEY = 'auth_token_v1';

const apiFactory = (baseURL: string) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - adiciona token JWT automaticamente
  apiInstance.interceptors.request.use(
    (config) => {
      const token = MMKVStorage.getString(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - trata erros de autenticação
  apiInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        console.error('API Error:', error.response.data);
        
        // Se o erro for 401 (Unauthorized), limpar dados de autenticação
        if (error.response.status === 401) {
          console.warn('Token inválido ou expirado, limpando dados de autenticação');
          MMKVStorage.delete(AUTH_TOKEN_KEY);
          MMKVStorage.delete('auth_user_v1');
          
          // Em React Native, usamos DeviceEventEmitter para comunicação entre módulos
          // O AuthContext deve escutar este evento via useEffect
          // Por enquanto, apenas logamos o erro - o AuthContext fará a validação na próxima chamada
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