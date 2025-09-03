import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {SettingItemProps} from './components/SettingsList/components/SettingItem';
import {useState, useCallback} from 'react';

const settingsListMock: SettingItemProps[] = [
  {
    isLastItem: false,
    isToggled: false,
    label: 'Alto Contraste',
    onToggle: () => {},
  },
  {
    isLastItem: true,
    isToggled: false,
    label: 'Texto Aumentado',
    onToggle: () => {},
  },
];

const useAccessibilitySettings = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const [settingsList, setSettingsList] =
    useState<SettingItemProps[]>(settingsListMock);

  const navigateToMyAccount = () => {
    navigate('MainTabs', {screen: 'MyAccount'});
  };

  const handleToggle = useCallback((index: number, value: boolean) => {
    setSettingsList(prev =>
      prev.map((item, idx) =>
        idx === index ? {...item, isToggled: value} : item,
      ),
    );
  }, []);

  const itemsWithToggle = settingsList.map((item, idx) => ({
    ...item,
    onToggle: (value: boolean) => handleToggle(idx, value),
  }));

  return {navigateToMyAccount, settingsList: itemsWithToggle};
};

export default useAccessibilitySettings;
