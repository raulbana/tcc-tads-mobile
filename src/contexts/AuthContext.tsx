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
  PatientProfileDTO,
} from '../types/auth';
import {
  MMKVStorage,
  REMEMBER_ME_KEY,
  ONBOARDING_DATA_KEY,
  ONBOARDING_PROFILE_DTO_KEY,
  ONBOARDING_URINATION_LOSS_KEY,
  ONBOARDING_WORKOUT_PLAN_KEY,
  PENDING_REGISTER_KEY,
  DIARY_CALENDAR_KEY,
  EXERCISES_DATA_KEY,
  MMKV_CACHE_USER_KEY,
  EXERCISES_BLOCKED_KEY,
} from '../storage/mmkvStorage';
import {transformProfileToDTO} from '../utils/profileUtils';
import authServices from '../modules/auth/services/authServices';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../navigation/routes';
import useNotifications from '../hooks/useNotifications';
import {queryClient} from '../../App';

const LOGGED_USER_KEY = 'auth_user_v1';
const AUTH_TOKEN_KEY = 'auth_token_v1';
const TEMP_USER_KEY = 'temp_user_v1';
const IS_ANONYMOUS_KEY = 'is_anonymous_v1';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  isAnonymous: boolean;
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
  saveOfflineOnboardingData: (
    profile: PatientProfile,
    urinationLoss?: string,
  ) => Promise<void>;
  saveOnboardingProfileDTO: (profileDTO: PatientProfileDTO) => Promise<void>;
  saveOnboardingWorkoutPlan: (
    workoutPlan: import('../types/onboarding').UserWorkoutPlanDTO,
  ) => Promise<void>;
  getOnboardingWorkoutPlanForRegister: () =>
    | import('../types/onboarding').UserWorkoutPlanDTO
    | null;
  setAnonymousMode: (isAnonymous: boolean) => Promise<void>;
  hasOnboardingData: () => boolean;
  validateToken: () => Promise<boolean>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  getOnboardingDataForRegister: () => PatientProfileDTO | null;
  setPendingRegister: (pending: boolean) => void;
  isPendingRegister: () => boolean;
  clearOnboardingData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialAuthState = () => {
  try {
    const rememberMe = MMKVStorage.getString(REMEMBER_ME_KEY);
    if (rememberMe === 'false') {
      return {user: null, isLoggedIn: false, isAnonymous: false};
    }

    const loggedUser = MMKVStorage.getString(LOGGED_USER_KEY);
    const token = MMKVStorage.getString(AUTH_TOKEN_KEY);

    if (loggedUser && token) {
      try {
        const parsedUser = JSON.parse(loggedUser) as User;
        return {user: parsedUser, isLoggedIn: true, isAnonymous: false};
      } catch (error) {
        return {user: null, isLoggedIn: false, isAnonymous: false};
      }
    }

    const tempUser = MMKVStorage.getString(TEMP_USER_KEY);
    const anonymousStatus = MMKVStorage.getString(IS_ANONYMOUS_KEY);
    if (tempUser) {
      try {
        const parsedUser = JSON.parse(tempUser) as User;
        return {
          user: parsedUser,
          isLoggedIn: false,
          isAnonymous: anonymousStatus === 'true',
        };
      } catch (error) {}
    }

    return {
      user: null,
      isLoggedIn: false,
      isAnonymous: anonymousStatus === 'true',
    };
  } catch (error) {
    return {user: null, isLoggedIn: false, isAnonymous: false};
  }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const initialAuthState = getInitialAuthState();
  const [user, setUser] = useState<User | null>(initialAuthState.user);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    initialAuthState.isLoggedIn,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(
    initialAuthState.isAnonymous,
  );
  const [error, setError] = useState<string | null>(null);
  const {navigate} = useNavigation<NavigationStackProp>();
  const {registerToken, removeToken, hasPermission} = useNotifications();

  const clearAuthData = useCallback(async () => {
    try {
      MMKVStorage.delete(LOGGED_USER_KEY);
      MMKVStorage.delete(AUTH_TOKEN_KEY);
      MMKVStorage.delete(REMEMBER_ME_KEY);
    } catch (error) {}
  }, []);

  const clearUserData = useCallback(async () => {
    try {
      MMKVStorage.delete(DIARY_CALENDAR_KEY);
      MMKVStorage.delete(EXERCISES_DATA_KEY);
      MMKVStorage.delete(EXERCISES_BLOCKED_KEY);
      MMKVStorage.delete(MMKV_CACHE_USER_KEY);
      MMKVStorage.delete(ONBOARDING_DATA_KEY);
      MMKVStorage.delete(ONBOARDING_PROFILE_DTO_KEY);
      MMKVStorage.delete(ONBOARDING_URINATION_LOSS_KEY);
      MMKVStorage.delete(ONBOARDING_WORKOUT_PLAN_KEY);
      MMKVStorage.delete(PENDING_REGISTER_KEY);
      queryClient.clear();
    } catch (error) {}
  }, []);

  const saveTempUser = useCallback(async (userObj: User) => {
    try {
      const userJson = JSON.stringify(userObj);
      MMKVStorage.set(TEMP_USER_KEY, userJson);
    } catch (error) {
      throw new Error('Erro ao salvar dados temporários');
    }
  }, []);

  const clearTempUser = useCallback(async () => {
    try {
      MMKVStorage.delete(TEMP_USER_KEY);
    } catch (error) {}
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (user?.id) {
        try {
          await removeToken(user.id);
        } catch (error) {}
      }

      await clearUserData();
      await clearAuthData();
      await clearTempUser();

      setUser(null);
      setIsLoggedIn(false);
      setIsAnonymous(false);
      navigate('Auth', {screen: 'Login'});
    } catch (error) {
      setError('Erro ao fazer logout');
    } finally {
      setIsLoading(false);
    }
  }, [
    clearAuthData,
    clearUserData,
    user,
    removeToken,
    navigate,
    clearTempUser,
  ]);

  const validateToken = useCallback(
    async (userId?: number): Promise<boolean> => {
      try {
        const token = MMKVStorage.getString(AUTH_TOKEN_KEY);
        if (!token) {
          return false;
        }

        try {
          if (userId) {
            await authServices.getUserById(userId);
            return true;
          }
          return true;
        } catch (error) {
          if (
            error instanceof Error &&
            (error.message.includes('401') || error.message.includes('403'))
          ) {
            return false;
          }
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    [],
  );

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setIsInitializing(true);
        setError(null);

        const rememberMe = MMKVStorage.getString(REMEMBER_ME_KEY);
        if (rememberMe === 'false') {
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
          try {
            const parsedUser = JSON.parse(loggedUser) as User;
            if (!mounted) return;

            const isValid = await validateToken(parsedUser.id);
            if (!mounted) return;

            if (isValid) {
              if (mounted) {
                setUser(parsedUser);
                setIsLoggedIn(true);
                setIsAnonymous(false);
              }

              if (hasPermission && parsedUser?.id) {
                try {
                  await registerToken(parsedUser.id);
                } catch (error) {}
              }

              navigate('MainTabs');
            } else {
              await clearAuthData();
              await clearTempUser();
              if (mounted) {
                setUser(null);
                setIsLoggedIn(false);
                setIsAnonymous(false);
              }
              navigate('Auth', {screen: 'Login'});
            }
          } catch (error) {
            await clearAuthData();
            await clearTempUser();
            if (mounted) {
              setUser(null);
              setIsLoggedIn(false);
              setIsAnonymous(false);
            }
            navigate('Auth', {screen: 'Login'});
          }
        } else {
          await loadTempUser();
        }
      } catch (error) {
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
        const anonymousStatus = MMKVStorage.getString(IS_ANONYMOUS_KEY);
        if (tempUser) {
          const parsedUser = JSON.parse(tempUser) as User;
          if (!mounted) return;
          setUser(parsedUser);
          setIsLoggedIn(false);
        }
        if (anonymousStatus === 'true' && mounted) {
          setIsAnonymous(true);
        }
      } catch (error) {}
    };

    initializeAuth();
    return () => {
      mounted = false;
    };
  }, [
    clearAuthData,
    navigate,
    validateToken,
    registerToken,
    hasPermission,
    clearTempUser,
  ]);

  const saveLoggedUser = useCallback(
    async (userObj: User, token: string, remember: boolean = true) => {
      try {
        const userJson = JSON.stringify(userObj);
        MMKVStorage.set(LOGGED_USER_KEY, userJson);
        MMKVStorage.set(AUTH_TOKEN_KEY, token);
        MMKVStorage.set(REMEMBER_ME_KEY, remember.toString());
      } catch (error) {
        throw new Error('Erro ao salvar dados do usuário');
      }
    },
    [],
  );

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
        setIsAnonymous(false);

        const shouldRemember = credentials.remember !== false;
        await saveLoggedUser(response.user, response.token, shouldRemember);
        await clearTempUser();

        try {
          const offlineSyncService = (
            await import('../services/offlineSyncService')
          ).default;
          const userId = response.user.id.toString();
          await offlineSyncService.syncAllOfflineData(userId);
        } catch (syncError) {}

        if (hasPermission && response.user?.id) {
          try {
            await registerToken(response.user.id);
          } catch (error) {}
        }

        navigate('MainTabs');
      } catch (error: any) {
        let errorMessage = 'Erro ao fazer login';

        if (error?.response) {
          const status = error.response.status;
          const apiMessage = error.response.data?.message;

          if (status === 401 || status === 400) {
            errorMessage =
              apiMessage ||
              'Credenciais incorretas. Verifique seu e-mail e senha.';
          } else if (apiMessage) {
            errorMessage = apiMessage;
          }
        } else if (error instanceof Error && error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [saveLoggedUser, clearTempUser, navigate, registerToken, hasPermission],
  );

  const clearOnboardingData = useCallback(async () => {
    try {
      MMKVStorage.delete(ONBOARDING_DATA_KEY);
      MMKVStorage.delete(ONBOARDING_PROFILE_DTO_KEY);
      MMKVStorage.delete(ONBOARDING_URINATION_LOSS_KEY);
      MMKVStorage.delete(ONBOARDING_WORKOUT_PLAN_KEY);
    } catch (error) {}
  }, []);

  const setPendingRegister = useCallback((pending: boolean) => {
    try {
      MMKVStorage.set(PENDING_REGISTER_KEY, pending.toString());
    } catch (error) {}
  }, []);

  const getOnboardingDataForRegister =
    useCallback((): PatientProfileDTO | null => {
      try {
        const profileDTOStr = MMKVStorage.getString(ONBOARDING_PROFILE_DTO_KEY);

        let profileDTO: PatientProfileDTO | null = null;

        if (profileDTOStr) {
          profileDTO = JSON.parse(profileDTOStr) as PatientProfileDTO;
        } else {
          const onboardingDataStr = MMKVStorage.getString(ONBOARDING_DATA_KEY);
          if (!onboardingDataStr) {
            return null;
          }

          const profile: PatientProfile = JSON.parse(onboardingDataStr);
          const urinationLoss =
            MMKVStorage.getString(ONBOARDING_URINATION_LOSS_KEY) || '';

          profileDTO = transformProfileToDTO(profile, urinationLoss);
        }

        return profileDTO;
      } catch (error) {
        return null;
      }
    }, []);

  const getOnboardingWorkoutPlanForRegister = useCallback(():
    | import('../types/onboarding').UserWorkoutPlanDTO
    | null => {
    try {
      const workoutPlanStr = MMKVStorage.getString(ONBOARDING_WORKOUT_PLAN_KEY);
      if (!workoutPlanStr) {
        return null;
      }
      return JSON.parse(
        workoutPlanStr,
      ) as import('../types/onboarding').UserWorkoutPlanDTO;
    } catch (error) {
      return null;
    }
  }, []);

  const register = useCallback(
    async (userData: registerRequest) => {
      try {
        setIsLoading(true);
        setError(null);

        const profileDTO = getOnboardingDataForRegister();
        if (profileDTO && !userData.profile) {
          userData.profile = profileDTO;
        }

        const workoutPlan = getOnboardingWorkoutPlanForRegister();
        if (workoutPlan && !userData.workoutPlan) {
          userData.workoutPlan = {
            planId: workoutPlan.plan.id,
            startDate: workoutPlan.startDate,
            endDate: workoutPlan.endDate,
            totalProgress: workoutPlan.totalProgress,
            weekProgress: workoutPlan.weekProgress,
            currentWeek: workoutPlan.currentWeek,
            completed: workoutPlan.completed,
          };
        }

        const response = await authServices.register(userData);

        await clearOnboardingData();
        setPendingRegister(false);

        navigate('Auth', {screen: 'Login'});
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro ao registrar usuário';
        setError(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [
      getOnboardingDataForRegister,
      getOnboardingWorkoutPlanForRegister,
      clearOnboardingData,
      setPendingRegister,
      navigate,
    ],
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
        setError('Erro ao salvar preferências');
        throw error;
      }
    },
    [user, updateUser],
  );

  const saveOfflineOnboardingData = useCallback(
    async (profile: PatientProfile, urinationLoss?: string) => {
      try {
        MMKVStorage.set(ONBOARDING_DATA_KEY, JSON.stringify(profile));
        if (urinationLoss) {
          MMKVStorage.set(ONBOARDING_URINATION_LOSS_KEY, urinationLoss);
        }
        if (user) {
          const updatedUser = {
            ...user,
            profile,
          };
          await updateUser(updatedUser);
        } else {
          const tempUser: User = {
            id: 0,
            name: '',
            email: '',
            profile,
            preferences: {
              highContrast: false,
              bigFont: false,
              darkMode: false,
              reminderCalendar: false,
              reminderWorkout: false,
              encouragingMessages: false,
              workoutMediaType: 'video',
            },
          };
          await saveTempUser(tempUser);
        }
      } catch (error) {
        throw new Error('Erro ao salvar dados de onboarding');
      }
    },
    [user, updateUser, saveTempUser],
  );

  const saveOnboardingProfileDTO = useCallback(
    async (profileDTO: PatientProfileDTO) => {
      try {
        MMKVStorage.set(ONBOARDING_PROFILE_DTO_KEY, JSON.stringify(profileDTO));
      } catch (error) {
        throw new Error('Erro ao salvar profile DTO de onboarding');
      }
    },
    [],
  );

  const saveOnboardingWorkoutPlan = useCallback(
    async (workoutPlan: import('../types/onboarding').UserWorkoutPlanDTO) => {
      try {
        MMKVStorage.set(
          ONBOARDING_WORKOUT_PLAN_KEY,
          JSON.stringify(workoutPlan),
        );
      } catch (error) {
        throw new Error('Erro ao salvar workout plan de onboarding');
      }
    },
    [],
  );

  const hasOnboardingData = useCallback((): boolean => {
    try {
      if (isLoggedIn && user?.profile?.id) {
        return true;
      }
      if (user?.profile?.id) {
        return true;
      }
      const onboardingData = MMKVStorage.getString(ONBOARDING_DATA_KEY);
      return !!onboardingData;
    } catch (error) {
      return false;
    }
  }, [user, isLoggedIn]);

  const validateTokenExposed = useCallback(async (): Promise<boolean> => {
    if (user) {
      return validateToken(user.id);
    }
    return validateToken();
  }, [user, validateToken]);

  const setAnonymousMode = useCallback(async (anonymous: boolean) => {
    try {
      MMKVStorage.set(IS_ANONYMOUS_KEY, anonymous.toString());
      setIsAnonymous(anonymous);
    } catch (error) {
      throw new Error('Erro ao definir modo anônimo');
    }
  }, []);

  const isPendingRegister = useCallback((): boolean => {
    try {
      const pending = MMKVStorage.getString(PENDING_REGISTER_KEY);
      return pending === 'true';
    } catch (error) {
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        isInitializing,
        isAnonymous,
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
        saveOfflineOnboardingData,
        saveOnboardingProfileDTO,
        saveOnboardingWorkoutPlan,
        getOnboardingWorkoutPlanForRegister,
        setAnonymousMode,
        hasOnboardingData,
        validateToken: validateTokenExposed,
        clearError,
        refreshUser,
        getOnboardingDataForRegister,
        setPendingRegister,
        isPendingRegister,
        clearOnboardingData,
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
