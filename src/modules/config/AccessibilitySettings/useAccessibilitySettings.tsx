import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {SettingItemProps} from './components/SettingsList/components/SettingItem';
import {useState, useCallback, useEffect} from 'react';
import {useAccessibility} from '../../../contexts/AccessibilityContext';
import {useAuth} from '../../../contexts/AuthContext';
import {AccessibilityPreferences} from '../../../types/config';

const useAccessibilitySettings = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {
    highContrast,
    bigFont,
    saveAccessibilityPreferences,
    isLoading,
    error,
  } = useAccessibility();
  const {user, isLoggedIn} = useAuth();
  const [localHighContrast, setLocalHighContrast] = useState(highContrast);
  const [localBigFont, setLocalBigFont] = useState(bigFont);

  // Update local state when context state changes
  useEffect(() => {
    setLocalHighContrast(highContrast);
    setLocalBigFont(bigFont);
  }, [highContrast, bigFont]);

  const navigateToMyAccount = () => {
    navigate('MainTabs', {screen: 'MyAccount'});
  };

  const handleSave = useCallback(async () => {
    try {
      const preferences: AccessibilityPreferences = {
        isHighContrast: localHighContrast,
        isBigFont: localBigFont,
      };

      await saveAccessibilityPreferences(preferences);

      // Navigate back to MyAccount after successful save
      navigateToMyAccount();
    } catch (error) {
      console.error('Error saving accessibility preferences:', error);
      // Error handling is done in the context
    }
  }, [localHighContrast, localBigFont, saveAccessibilityPreferences]);

  const handleToggle = useCallback((index: number, value: boolean) => {
    if (index === 0) {
      setLocalHighContrast(value);
    } else if (index === 1) {
      setLocalBigFont(value);
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
      isLastItem: true,
      isToggled: localBigFont,
      label: 'Texto Aumentado',
      onToggle: (value: boolean) => handleToggle(1, value),
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
