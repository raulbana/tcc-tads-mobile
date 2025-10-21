import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {useAuth} from './AuthContext';
import {AccessibilityPreferences} from '../types/config';
import configServices from '../modules/config/services/configServices';
import colors from '../theme/colors';
import typography from '../theme/typography';
import fonts from '../theme/fonts';

interface AccessibilityContextType {
  highContrast: boolean;
  bigFont: boolean;
  isLoading: boolean;
  error: string | null;
  saveAccessibilityPreferences: (
    preferences: AccessibilityPreferences,
  ) => Promise<void>;
  loadAccessibilityPreferences: () => Promise<void>;
  clearError: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const AccessibilityProvider = ({children}: {children: ReactNode}) => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [bigFont, setBigFont] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {user, isLoggedIn, savePreferences} = useAuth();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadAccessibilityPreferences = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (isLoggedIn && user) {
        try {
          const preferences = await configServices.getAccessibilityPreferences(
            user.id,
          );
          setHighContrast(preferences.isHighContrast);
          setBigFont(preferences.isBigFont);
        } catch (apiError) {
          console.warn(
            'Failed to load accessibility preferences from API, using local preferences',
          );
          const localPreferences = user.preferences;
          setHighContrast(localPreferences.highContrast);
          setBigFont(localPreferences.bigFont);
        }
      } else if (user) {
        const localPreferences = user.preferences;
        setHighContrast(localPreferences.highContrast);
        setBigFont(localPreferences.bigFont);
      }
    } catch (error) {
      console.error('Error loading accessibility preferences:', error);
      setError('Erro ao carregar preferências de acessibilidade');
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, user]);

  const saveAccessibilityPreferences = useCallback(
    async (preferences: AccessibilityPreferences) => {
      try {
        setIsLoading(true);
        setError(null);

        setHighContrast(preferences.isHighContrast);
        setBigFont(preferences.isBigFont);

        if (user) {
          const updatedPreferences = {
            ...user.preferences,
            highContrast: preferences.isHighContrast,
            bigFont: preferences.isBigFont,
          };
          await savePreferences(updatedPreferences);

          // If user is logged in, also save to API
          if (isLoggedIn) {
            try {
              await configServices.updateAccessibilityPreferences(
                user.id,
                preferences,
              );
            } catch (apiError) {
              console.warn(
                'Failed to save accessibility preferences to API:',
                apiError,
              );
            }
          }
        }
      } catch (error) {
        console.error('Error saving accessibility preferences:', error);
        setError('Erro ao salvar preferências de acessibilidade');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, isLoggedIn, savePreferences],
  );

  useEffect(() => {
    if (user) {
      loadAccessibilityPreferences();
    } else {
      setHighContrast(false);
      setBigFont(false);
    }
  }, [user, loadAccessibilityPreferences]);

  const value = {
    highContrast,
    bigFont,
    isLoading,
    error,
    saveAccessibilityPreferences,
    loadAccessibilityPreferences,
    clearError,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider',
    );
  }
  return context;
};
