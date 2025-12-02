import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {ThemeProvider, DefaultTheme} from 'styled-components/native';
import {useAuth} from './AuthContext';
import {AccessibilityPreferences} from '../types/config';
import configServices from '../modules/config/services/configServices';
import colors from '../theme/colors';
import typography from '../theme/typography';
import fonts from '../theme/fonts';
import {accessibleColors} from '../theme/accessibleColors';
import {accessibleTypography} from '../theme/accessibleTypography';
import darkColors from '../theme/darkColors';

interface AccessibilityContextType {
  highContrast: boolean;
  bigFont: boolean;
  darkMode: boolean;
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
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [themeKey, setThemeKey] = useState<string>('theme-default');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const {user, isLoggedIn, savePreferences} = useAuth();

  const currentTheme = useMemo((): DefaultTheme => {
    let themeColors = colors;
    let themeKey: 'default' | 'high-contrast' | 'dark' = 'default';

    if (highContrast) {
      themeColors = accessibleColors;
      themeKey = 'high-contrast';
    } else if (darkMode) {
      themeColors = darkColors;
      themeKey = 'dark';
    }

    return {
      key: themeKey,
      colors: themeColors,
      typography: bigFont ? accessibleTypography : typography,
      fonts,
    };
  }, [highContrast, bigFont, darkMode]);

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
          setDarkMode(preferences.isDarkMode);
        } catch (apiError) {
          console.warn(
            'Failed to load accessibility preferences from API, using local preferences',
          );
          const localPreferences = user.preferences;
          setHighContrast(localPreferences.highContrast);
          setBigFont(localPreferences.bigFont);
          setDarkMode(localPreferences.darkMode);
        }
      } else if (user) {
        const localPreferences = user.preferences;
        setHighContrast(localPreferences.highContrast);
        setBigFont(localPreferences.bigFont);
        setDarkMode(localPreferences.darkMode);
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
        setIsSaving(true);
        setError(null);

        setHighContrast(preferences.isHighContrast);
        setBigFont(preferences.isBigFont);
        setDarkMode(preferences.isDarkMode);

        if (user) {
          const updatedPreferences = {
            ...user.preferences,
            highContrast: preferences.isHighContrast,
            bigFont: preferences.isBigFont,
            darkMode: preferences.isDarkMode,
          };

          await savePreferences(updatedPreferences);

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
        if (user) {
          setHighContrast(user.preferences.highContrast);
          setBigFont(user.preferences.bigFont);
          setDarkMode(user.preferences.darkMode);
        }
        throw error;
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsSaving(false);
        }, 100);
      }
    },
    [user, isLoggedIn, savePreferences],
  );

  useEffect(() => {
    if (user && !isSaving) {
      loadAccessibilityPreferences();
    } else if (!user) {
      setHighContrast(false);
      setBigFont(false);
      setDarkMode(false);
    }
  }, [user?.id, loadAccessibilityPreferences, isSaving]);

  useEffect(() => {
    const newThemeKey = `theme-${highContrast}-${bigFont}-${darkMode}`;
    setThemeKey(newThemeKey);
  }, [highContrast, bigFont, darkMode]);

  const value = {
    highContrast,
    bigFont,
    darkMode,
    isLoading,
    error,
    saveAccessibilityPreferences,
    loadAccessibilityPreferences,
    clearError,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <ThemeProvider theme={currentTheme} key={themeKey}>
        {children}
      </ThemeProvider>
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
