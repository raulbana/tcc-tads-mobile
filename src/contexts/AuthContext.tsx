import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {
  User,
  PatientProfile,
  Preferences,
  loginRequest,
  registerRequest,
} from '../types/auth';
import {MMKVStorage} from '../storage/mmkvStorage';
import authServices from '../modules/auth/services/authServices';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProp } from '../navigation/routes';

// Storage keys - usando apenas MMKV
const LOGGED_USER_KEY = 'auth_user_v1';
const AUTH_TOKEN_KEY = 'auth_token_v1';
const TEMP_USER_KEY = 'temp_user_v1'; // Para usuários não cadastrados

interface AuthContextType {
  // Estados principais
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;

  // Ações de autenticação
  login: (credentials: loginRequest) => Promise<void>;
  register: (userData: registerRequest) => Promise<void>;
  logout: () => Promise<void>;

  // Gerenciamento de dados temporários (usuários não cadastrados)
  saveTempUser: (userData: User) => Promise<void>;
  clearTempUser: () => Promise<void>;

  // Atualização de dados
  updateUser: (updatedUser: User) => Promise<void>;

  // Getters de dados do usuário
  getPatientProfile: () => PatientProfile | null;
  getPreferences: () => Preferences | null;
  getProfilePictureUrl: () => string;

  // Salvar dados específicos
  savePatientProfile: (profile: PatientProfile) => Promise<void>;
  savePreferences: (preferences: Preferences) => Promise<void>;

  // Utilitários
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {navigate} = useNavigation<NavigationStackProp>();

  // Função para limpar todos os dados de autenticação (declarada primeiro)
  const clearAuthData = useCallback(async () => {
    try {
      MMKVStorage.delete(LOGGED_USER_KEY);
      MMKVStorage.delete(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }, []);

  // Função de logout
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Limpar dados de autenticação
      await clearAuthData();

      // Limpar estado
      setUser(null);
      setIsLoggedIn(false);

      // Não carregar usuário temporário automaticamente no logout
      // O usuário deve escolher se quer continuar como temporário
    } catch (error) {
      console.error('Logout error:', error);
      setError('Erro ao fazer logout');
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData]);

  // Inicialização do contexto
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setIsInitializing(true);
        setError(null);

        // 1. Verificar se há usuário logado (com token)
        const loggedUser = MMKVStorage.getString(LOGGED_USER_KEY);
        const token = MMKVStorage.getString(AUTH_TOKEN_KEY);

        if (loggedUser && token) {
          const parsedUser = JSON.parse(loggedUser) as User;
          if (!mounted) return;

          // Validar token com a API
          try {
            await authServices.getUserById(parsedUser.id);
            setUser(parsedUser);
            setIsLoggedIn(true);
          } catch (error) {
            // Token inválido, limpar dados
            await clearAuthData();
            // Verificar se há usuário temporário
            await loadTempUser();
          }
        } else {
          // Não há usuário logado, verificar usuário temporário
          await loadTempUser();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Erro ao inicializar autenticação');
        await loadTempUser(); // Fallback para usuário temporário
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    const loadTempUser = async () => {
      try {
        const tempUser = MMKVStorage.getString(TEMP_USER_KEY);
        if (tempUser) {
          const parsedUser = JSON.parse(tempUser) as User;
          if (!mounted) return;
          setUser(parsedUser);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error loading temp user:', error);
      }
    };

    initializeAuth();
    return () => {
      mounted = false;
    };
  }, []);

  // Funções de persistência simplificadas (apenas MMKV)
  const saveLoggedUser = useCallback(async (userObj: User, token: string) => {
    try {
      const userJson = JSON.stringify(userObj);
      MMKVStorage.set(LOGGED_USER_KEY, userJson);
      MMKVStorage.set(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving logged user:', error);
      throw new Error('Erro ao salvar dados do usuário');
    }
  }, []);

  const saveTempUser = useCallback(async (userObj: User) => {
    try {
      const userJson = JSON.stringify(userObj);
      MMKVStorage.set(TEMP_USER_KEY, userJson);
    } catch (error) {
      console.error('Error saving temp user:', error);
      throw new Error('Erro ao salvar dados temporários');
    }
  }, []);

  const clearTempUser = useCallback(async () => {
    try {
      MMKVStorage.delete(TEMP_USER_KEY);
    } catch (error) {
      console.error('Error clearing temp user:', error);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Login com integração à API
  const login = useCallback(
    async (credentials: loginRequest) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await authServices.login(credentials);

        setUser(response.user);
        setIsLoggedIn(true);
        await saveLoggedUser(response.user, response.token);
        await clearTempUser(); // Limpar dados temporários ao fazer login
        navigate('MainTabs');
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro ao fazer login';
        setError(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [saveLoggedUser, clearTempUser, navigate],
  );

  // Registro com integração à API
  const register = useCallback(
    async (userData: registerRequest) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await authServices.register(userData);

        // Após registro bem-sucedido, fazer login automaticamente
        const loginCredentials = {
          email: userData.email,
          password: userData.password,
        };

        await login(loginCredentials);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro ao registrar usuário';
        setError(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [login],
  );

  // Salvar usuário temporário (não cadastrado)
  const saveTempUserData = useCallback(
    async (userData: User) => {
      try {
        setError(null);
        setUser(userData);
        setIsLoggedIn(false);
        await saveTempUser(userData);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Erro ao salvar dados temporários';
        setError(errorMessage);
        throw error;
      }
    },
    [saveTempUser],
  );

  // Refresh dos dados do usuário
  const refreshUser = useCallback(async () => {
    if (!user || !isLoggedIn) return;

    try {
      setIsLoading(true);
      setError(null);

      const updatedUser = await authServices.getUserById(user.id);
      setUser(updatedUser);
      await saveLoggedUser(
        updatedUser,
        MMKVStorage.getString(AUTH_TOKEN_KEY) || '',
      );
    } catch (error) {
      console.error('Refresh user error:', error);
      setError('Erro ao atualizar dados do usuário');
      // Se o erro for 401, fazer logout
      if (error instanceof Error && error.message.includes('401')) {
        await logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, isLoggedIn, saveLoggedUser, logout]);

  // Atualizar dados do usuário
  const updateUser = useCallback(
    async (updatedUser: User) => {
      try {
        setError(null);
        setUser(updatedUser);

        if (isLoggedIn) {
          // Se logado, atualizar via API e salvar no storage de usuário logado
          const token = MMKVStorage.getString(AUTH_TOKEN_KEY) || '';
          await saveLoggedUser(updatedUser, token);
        } else {
          // Se não logado, salvar como usuário temporário
          await saveTempUser(updatedUser);
        }
      } catch (error) {
        console.error('Update user error:', error);
        setError('Erro ao atualizar dados do usuário');
        throw error;
      }
    },
    [isLoggedIn, saveLoggedUser, saveTempUser],
  );

  const getPatientProfile = (): PatientProfile | null => {
    return user ? user.profile : null;
  };

  const getPreferences = (): Preferences | null => {
    return user ? user.preferences : null;
  };

  const getProfilePictureUrl = (): string => {
    return user ? user.profilePictureUrl ?? '' : '';
  };

  const savePatientProfile = useCallback(
    async (profile: PatientProfile) => {
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      try {
        const updatedUser = {
          ...user,
          profile,
        };
        await updateUser(updatedUser);
      } catch (error) {
        console.error('Save patient profile error:', error);
        setError('Erro ao salvar perfil do paciente');
        throw error;
      }
    },
    [user, updateUser],
  );

  const savePreferences = useCallback(
    async (preferences: Preferences) => {
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      try {
        const updatedUser = {
          ...user,
          preferences,
        };
        await updateUser(updatedUser);
      } catch (error) {
        console.error('Save preferences error:', error);
        setError('Erro ao salvar preferências');
        throw error;
      }
    },
    [user, updateUser],
  );

  return (
    <AuthContext.Provider
      value={{
        // Estados principais
        user,
        isLoggedIn,
        isLoading,
        isInitializing,
        error,

        // Ações de autenticação
        login,
        register,
        logout,

        // Gerenciamento de dados temporários
        saveTempUser: saveTempUserData,
        clearTempUser,

        // Atualização de dados
        updateUser,

        // Getters de dados do usuário
        getPatientProfile,
        getPreferences,
        getProfilePictureUrl,

        // Salvar dados específicos
        savePatientProfile,
        savePreferences,

        // Utilitários
        clearError,
        refreshUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
