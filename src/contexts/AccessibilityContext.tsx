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

// High contrast color palette
const highContrastColors = {
  ...colors,
  gray_01: '#FFFFFF',
  gray_02: '#FFFFFF',
  gray_03: '#F0F0F0',
  gray_04: '#D0D0D0',
  gray_05: '#A0A0A0',
  gray_06: '#808080',
  gray_07: '#404040',
  gray_08: '#000000',
  purple_03: '#8B008B',
  purple_04: '#4B0082',
  default_green: '#006400',
  checked_green: '#008000',
  error: '#DC143C',
  info: '#0000FF',
  warning: '#FF8C00',
  success: '#008000',
  white: '#FFFFFF',
};

// Font scale multiplier for big font
const FONT_SCALE_FACTOR = 1.2;

// Helper function to scale font sizes
const scaleTypography = (originalTypography: typeof typography) => {
  const scaleFontSize = (fontSize: string) => {
    const size = parseFloat(fontSize);
    return Math.round(size * FONT_SCALE_FACTOR).toString();
  };

  const scaleTypographySection = (section: any) => {
    const scaled: any = {};
    Object.keys(section).forEach(key => {
      scaled[key] = {
        ...section[key],
        fontSize: scaleFontSize(section[key].fontSize),
      };
    });
    return scaled;
  };

  return {
    paragraph: scaleTypographySection(originalTypography.paragraph),
    title: scaleTypographySection(originalTypography.title),
  };
};

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
          // Try to load from API first
          const preferences = await configServices.getAccessibilityPreferences(
            user.id,
          );
          setHighContrast(preferences.isHighContrast);
          setBigFont(preferences.isBigFont);
        } catch (apiError) {
          console.warn(
            'Failed to load accessibility preferences from API, using local preferences',
          );
          // Fallback to local preferences from user object
          const localPreferences = user.preferences;
          setHighContrast(localPreferences.highContrast);
          setBigFont(localPreferences.bigFont);
        }
      } else if (user) {
        // For temp users, use local preferences
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

        // Update local state
        setHighContrast(preferences.isHighContrast);
        setBigFont(preferences.isBigFont);

        if (user) {
          // Update AuthContext with new preferences
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
              // Continue anyway since local preferences are saved
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

  // Load preferences when user changes
  useEffect(() => {
    if (user) {
      loadAccessibilityPreferences();
    } else {
      // Reset to defaults when no user
      setHighContrast(false);
      setBigFont(false);
    }
  }, [user, loadAccessibilityPreferences]);

  // Create modified theme based on accessibility preferences
  const theme = useMemo(() => {
    const currentColors = highContrast ? highContrastColors : colors;
    const currentTypography = bigFont
      ? scaleTypography(typography)
      : typography;

    return {
      colors: currentColors,
      typography: currentTypography,
      fonts,
    };
  }, [highContrast, bigFont]);

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
