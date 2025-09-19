import {QueryKey, useMutation} from '@tanstack/react-query';
import {
  loginRequest,
  loginResponse,
  registerRequest,
  registerResponse,
} from '../../../types/auth';
import authServices from './authServices';

export const authQueryFactory = (queryKey: QueryKey) => {
  return {
    useLogin: () =>
      useMutation<loginResponse, Error, loginRequest>({
        mutationFn: (data: loginRequest) => authServices.login(data),
      }),

    useRegister: () =>
      useMutation<registerResponse, Error, registerRequest>({
        mutationFn: (data: registerRequest) => authServices.register(data),
      }),
  };
};

const useAuthQueries = (queryKey: QueryKey) => {
  const queries = authQueryFactory(queryKey);
  return {...queries};
};

export default useAuthQueries;