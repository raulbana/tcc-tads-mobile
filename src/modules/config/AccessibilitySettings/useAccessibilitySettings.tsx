import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {SettingItemProps} from './components/SettingsList/components/SettingItem';
import {useState, useCallback, useEffect} from 'react';
import {useAccessibility} from '../../../contexts/AccessibilityContext';
import {AccessibilityPreferences} from '../../../types/config';

const useAccessibilitySettings = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {
    highContrast,
    bigFont,
    darkMode,
    saveAccessibilityPreferences,
    isLoading,
    error,
  } = useAccessibility();
  const [localHighContrast, setLocalHighContrast] = useState(highContrast);
  const [localBigFont, setLocalBigFont] = useState(bigFont);
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);

  useEffect(() => {
    setLocalHighContrast(highContrast);
    setLocalBigFont(bigFont);
    setLocalDarkMode(darkMode);
  }, [highContrast, bigFont, darkMode]);

  const navigateToMyAccount = () => {
    navigate('MainTabs', {screen: 'MyAccount'});
  };

  const handleSave = useCallback(async () => {
    try {
      const preferences: AccessibilityPreferences = {
        isHighContrast: localHighContrast,
        isBigFont: localBigFont,
        isDarkMode: localDarkMode,
      };

      await saveAccessibilityPreferences(preferences);

      navigateToMyAccount();
    } catch (error) {
      console.error('Error saving accessibility preferences:', error);
    }
  }, [localHighContrast, localBigFont, localDarkMode, saveAccessibilityPreferences]);

  const handleToggle = useCallback((index: number, value: boolean) => {
    if (index === 0) {
      setLocalHighContrast(value);
      if (value) {
        setLocalDarkMode(false);
      }
    } else if (index === 1) {
      setLocalBigFont(value);
    } else if (index === 2) {
      setLocalDarkMode(value);
      if (value) {
        setLocalHighContrast(false);
      }
    }
  }, []);

  const settingsList: SettingItemProps[] = [
    {
      isLastItem: false,
      isToggled: localHighContrast,
      label: 'Alto Contraste',
      onToggle: (value: boolean) => handleToggle(0, value),
    },
    {
      isLastItem: false,
      isToggled: localBigFont,
      label: 'Texto Aumentado',
      onToggle: (value: boolean) => handleToggle(1, value),
    },
    {
      isLastItem: true,
      isToggled: localDarkMode,
      label: 'Modo Escuro',
      onToggle: (value: boolean) => handleToggle(2, value),
    },
  ];

  return {
    navigateToMyAccount,
    settingsList,
    handleSave,
    isLoading,
    error,
  };
};

export default useAccessibilitySettings;
