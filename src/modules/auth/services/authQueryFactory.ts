import {QueryKey, useMutation} from '@tanstack/react-query';
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

    useForgotPasswordRequest: () =>
      useMutation<forgotPasswordRequestResponse, Error, forgotPasswordRequestRequest>({
        mutationFn: (data: forgotPasswordRequestRequest) => authServices.forgotPasswordRequest(data),
      }),

    useForgotPasswordReset: () =>
      useMutation<forgotPasswordValidateResponse, Error, forgotPasswordValidateRequest>({
        mutationFn: (data: forgotPasswordValidateRequest) => authServices.forgotPasswordReset(data),
      }),

    useUpdateUser: () =>
      useMutation<updateUserResponse, Error, updateUserRequest>({
        mutationFn: (data: updateUserRequest) => authServices.updateUser(data),
      }),

    useGetUserById: () =>
      useMutation<getUserByIdResponse, Error, number>({
        mutationFn: (id: number) => authServices.getUserById(id),
      }),
  };
};

const useAuthQueries = (queryKey: QueryKey) => {
  const queries = authQueryFactory(queryKey);
  return {...queries};
};

export default useAuthQueries;