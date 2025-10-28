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
import {MMKVStorage, REMEMBER_ME_KEY} from '../storage/mmkvStorage';
import authServices from '../modules/auth/services/authServices';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../navigation/routes';

const LOGGED_USER_KEY = 'auth_user_v1';
const AUTH_TOKEN_KEY = 'auth_token_v1';
const TEMP_USER_KEY = 'temp_user_v1';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
  login: (credentials: loginRequest) => Promise<void>;
  register: (userData: registerRequest) => Promise<void>;
  logout: () => Promise<void>;
  saveTempUser: (userData: User) => Promise<void>;
  clearTempUser: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
  getPatientProfile: () => PatientProfile | null;
  getPreferences: () => Preferences | null;
  getProfilePictureUrl: () => string;
  savePatientProfile: (profile: PatientProfile) => Promise<void>;
  savePreferences: (preferences: Preferences) => Promise<void>;
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

  const clearAuthData = useCallback(async () => {
    try {
      MMKVStorage.delete(LOGGED_USER_KEY);
      MMKVStorage.delete(AUTH_TOKEN_KEY);
      MMKVStorage.delete(REMEMBER_ME_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await clearAuthData();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Erro ao fazer logout');
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setIsInitializing(true);
        setError(null);

        // Verificar se "lembrar de mim" está desabilitado
        const rememberMe = MMKVStorage.getString(REMEMBER_ME_KEY);
        if (rememberMe === 'false') {
          // Se não deve lembrar, limpar dados e carregar usuário temporário
          await clearAuthData();
          await loadTempUser();
          if (mounted) {
            setIsInitializing(false);
          }
          return;
        }

        const loggedUser = MMKVStorage.getString(LOGGED_USER_KEY);
        const token = MMKVStorage.getString(AUTH_TOKEN_KEY);

        if (loggedUser && token) {
          const parsedUser = JSON.parse(loggedUser) as User;
          if (!mounted) return;

          try {
            setUser(parsedUser);
            setIsLoggedIn(true);
            navigate('MainTabs');
          } catch (error) {
            await clearAuthData();
            await loadTempUser();
          }
        } else {
          await loadTempUser();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Erro ao inicializar autenticação');
        await loadTempUser();
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
  }, [clearAuthData, navigate]);

  const saveLoggedUser = useCallback(
    async (userObj: User, token: string, remember: boolean = true) => {
      try {
        const userJson = JSON.stringify(userObj);
        MMKVStorage.set(LOGGED_USER_KEY, userJson);
        MMKVStorage.set(AUTH_TOKEN_KEY, token);
        MMKVStorage.set(REMEMBER_ME_KEY, remember.toString());
      } catch (error) {
        console.error('Error saving logged user:', error);
        throw new Error('Erro ao salvar dados do usuário');
      }
    },
    [],
  );

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

  const login = useCallback(
    async (credentials: loginRequest) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authServices.login(credentials);
        setUser(response.user);
        setIsLoggedIn(true);

        // Passar o valor de remember (default true se não especificado)
        const shouldRemember = credentials.remember !== false;
        await saveLoggedUser(response.user, response.token, shouldRemember);
        await clearTempUser();
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

  const register = useCallback(
    async (userData: registerRequest) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authServices.register(userData);
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

  const refreshUser = useCallback(async () => {
    if (!user || !isLoggedIn) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await authServices.getUserById(user.id);
      setUser(updatedUser);
      const rememberMe = MMKVStorage.getString(REMEMBER_ME_KEY);
      await saveLoggedUser(
        updatedUser,
        MMKVStorage.getString(AUTH_TOKEN_KEY) || '',
        rememberMe !== 'false',
      );
    } catch (error) {
      console.error('Refresh user error:', error);
      setError('Erro ao atualizar dados do usuário');
      if (error instanceof Error && error.message.includes('401')) {
        await logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, isLoggedIn, saveLoggedUser, logout]);

  const updateUser = useCallback(
    async (updatedUser: User) => {
      try {
        setError(null);
        setUser(updatedUser);

        if (isLoggedIn) {
          const token = MMKVStorage.getString(AUTH_TOKEN_KEY) || '';
          await saveLoggedUser(updatedUser, token);
        } else {
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
        user,
        isLoggedIn,
        isLoading,
        isInitializing,
        error,
        login,
        register,
        logout,
        saveTempUser: saveTempUserData,
        clearTempUser,
        updateUser,
        getPatientProfile,
        getPreferences,
        getProfilePictureUrl,
        savePatientProfile,
        savePreferences,
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
