import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {User, PatientProfile, Preferences} from '../types/auth';
import {
  MMKVStorage,
  ANON_USER_KEY,
  MMKV_CACHE_USER_KEY,
} from '../storage/mmkvStorage';
import {asyncSet, asyncGet, asyncRemove} from '../storage/asyncStorage';

const LOGGED_USER_KEY = 'auth_user_v1';
const AUTH_TOKEN_KEY = 'auth_token_v1';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  registerLocal: (userBasic: User) => Promise<void>;
  login: (userData: User) => Promise<void>;
  setSession: (payload: {user: User; token?: string}) => Promise<void>;
  logout: () => Promise<void>;
  clearLocalRegistration: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
  getPatientProfile: () => PatientProfile | null;
  getPreferences: () => Preferences | null;
  getProfilePictureUrl: () => string;
  savePatientProfile: (profile: PatientProfile) => Promise<void>;
  savePreferences: (preferences: Preferences) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const asyncUser = await asyncGet(LOGGED_USER_KEY);
        if (asyncUser) {
          const parsed = JSON.parse(asyncUser) as User;
          if (!mounted) return;
          setUser(parsed);
          setIsLoggedIn(true);
          MMKVStorage.set(MMKV_CACHE_USER_KEY, asyncUser);
          return;
        }

        const mmUser = MMKVStorage.getString(ANON_USER_KEY);
        if (mmUser) {
          const parsed = JSON.parse(mmUser) as User;
          if (!mounted) return;
          setUser(parsed);
          setIsLoggedIn(false);
          return;
        }

        const cached = MMKVStorage.getString(MMKV_CACHE_USER_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as User;
          if (!mounted) return;
          setUser(parsed);
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.warn('Auth hydrate error', e);
      }
    };

    hydrate();
    return () => {
      mounted = false;
    };
  }, []);

  const persistAnon = useCallback(async (userObj: User | null) => {
    try {
      if (userObj) {
        const json = JSON.stringify(userObj);
        MMKVStorage.set(ANON_USER_KEY, json);
      } else {
        MMKVStorage.delete(ANON_USER_KEY);
      }
    } catch (e) {
      console.warn('persistAnon error', e);
    }
  }, []);

  const persistLogged = useCallback(async (userObj: User | null) => {
    try {
      if (userObj) {
        const json = JSON.stringify(userObj);
        await asyncSet(LOGGED_USER_KEY, json);
        MMKVStorage.set(MMKV_CACHE_USER_KEY, json);
      } else {
        await asyncRemove(LOGGED_USER_KEY);
        MMKVStorage.delete(MMKV_CACHE_USER_KEY);
      }
    } catch (e) {
      console.warn('persistLogged error', e);
    }
  }, []);

  const persistToken = useCallback(async (token?: string | null) => {
    try {
      if (token) {
        await asyncSet(AUTH_TOKEN_KEY, token);
        MMKVStorage.set(AUTH_TOKEN_KEY, token);
      } else {
        await asyncRemove(AUTH_TOKEN_KEY);
        MMKVStorage.delete(AUTH_TOKEN_KEY);
      }
    } catch (e) {
      console.warn('persistToken error', e);
    }
  }, []);

  const registerLocal = useCallback(
    async (userBasic: User) => {
      setUser(userBasic);
      setIsLoggedIn(false);
      await persistAnon(userBasic);
    },
    [persistAnon],
  );

  const login = useCallback(
    async (userData: User) => {
      setUser(userData);
      setIsLoggedIn(true);
      await persistLogged(userData);
      try {
        MMKVStorage.set(ANON_USER_KEY, JSON.stringify(userData));
      } catch (e) {
        console.warn(e);
      }
    },
    [persistLogged],
  );

  const setSession = useCallback(
    async (payload: {user: User; token?: string}) => {
      const {user: payloadUser, token} = payload;
      setUser(payloadUser);
      setIsLoggedIn(true);
      await persistLogged(payloadUser);
      if (token) {
        await persistToken(token);
      }
      try {
        MMKVStorage.set(ANON_USER_KEY, JSON.stringify(payloadUser));
      } catch (e) {}
    },
    [persistLogged, persistToken],
  );

  const logout = useCallback(async () => {
    setIsLoggedIn(false);
    try {
      await asyncRemove(LOGGED_USER_KEY);
      await persistToken(null);
      const mmUser = MMKVStorage.getString(ANON_USER_KEY);
      if (mmUser) {
        setUser(JSON.parse(mmUser) as User);
        return;
      }
      const cache = MMKVStorage.getString(MMKV_CACHE_USER_KEY);
      if (cache) {
        setUser(JSON.parse(cache) as User);
        return;
      }
      setUser(null);
    } catch (e) {
      console.warn('logout persist error', e);
      setUser(null);
    }
  }, [persistToken]);

  const clearLocalRegistration = useCallback(async () => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      MMKVStorage.delete(ANON_USER_KEY);
      MMKVStorage.delete(MMKV_CACHE_USER_KEY);
      MMKVStorage.delete(AUTH_TOKEN_KEY);
      await asyncRemove(LOGGED_USER_KEY);
      await asyncRemove(AUTH_TOKEN_KEY);
    } catch (e) {
      console.warn('clearLocalRegistration error', e);
    }
  }, []);

  const updateUser = useCallback(
    async (updatedUser: User) => {
      setUser(updatedUser);
      try {
        if (isLoggedIn) {
          await persistLogged(updatedUser);
        } else {
          await persistAnon(updatedUser);
        }
      } catch (e) {
        console.warn('updateUser persist error', e);
      }
    },
    [isLoggedIn, persistAnon, persistLogged],
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

  const savePatientProfile = async (profile: PatientProfile) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile,
      };
      setUser(updatedUser);
      await persistLogged(updatedUser);
    }
  };

  const savePreferences = async (preferences: Preferences) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences,
      };
      setUser(updatedUser);
      await persistLogged(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        registerLocal,
        login,
        setSession,
        logout,
        clearLocalRegistration,
        updateUser,
        getPatientProfile,
        getPreferences,
        getProfilePictureUrl,
        savePatientProfile,
        savePreferences,
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
