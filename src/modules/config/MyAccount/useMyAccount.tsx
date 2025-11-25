import {useNavigation} from '@react-navigation/native';
import {moderateScale} from '../../../utils/scales';
import {OptionItem} from './components/OptionsList/OptionsList';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import {useNotificationPermissionModal} from '../../../hooks/useNotificationPermissionModal';

const useMyAccount = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {user, isLoggedIn, logout} = useAuth();
  const {
    visible: notificationModalVisible,
    showModal: showNotificationModal,
    hideModal: hideNotificationModal,
  } = useNotificationPermissionModal();

  const theme = useDynamicTheme();

  const navigateToAccessibilitySettings = () => {
    navigate('Config', {screen: 'AccessibilitySettings'});
  };

  const navigateToTalkToUs = () => {
    navigate('Config', {screen: 'TalkToUs'});
  };

  const navigateToRegister = () => {
    navigate('Auth', {screen: 'Register'});
  };

  const navigateToEditProfile = () => {
    navigate('Config', {screen: 'EditProfile'});
  };

  const navigateToProfile = () => {
    navigate('Config', {screen: 'Profile' as any});
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNotifications = () => {
    showNotificationModal();
  };

  const handleAboutApp = () => {
    navigate('Config', {screen: 'AboutApp'});
  };

  const options: OptionItem[] = [
    ...(isLoggedIn
      ? [
          {
            label: 'Meu Perfil',
            icon: {
              name: 'User' as const,
              size: moderateScale(24),
              color: theme.colors.gray_07,
            },
            onPress: navigateToProfile,
          },
        ]
      : []),
    {
      label: 'Acessibilidade',
      icon: {
        name: 'Wheelchair',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
      onPress: navigateToAccessibilitySettings,
    },
    {
      label: 'Notificações',
      icon: {
        name: 'Bell',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
      onPress: handleNotifications,
    },
    {
      label: 'Sobre o Aplicativo',
      icon: {
        name: 'Info',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
      onPress: handleAboutApp,
    },
    ...(isLoggedIn
      ? [
          {
            label: 'Sair',
            icon: {
              name: 'SignOut' as const,
              size: moderateScale(24),
              color: theme.colors.gray_07,
            },
            onPress: handleLogout,
          },
        ]
      : []),
  ];

  const advantages: string[] = [
    'Personalização de treino',
    'Conteúdos exclusivos',
    'Acompanhamento de progresso',
    'Comunidade e suporte',
    'Relatórios detalhados',
  ];

  return {
    options,
    advantages,
    navigateToTalkToUs,
    navigateToRegister,
    navigateToEditProfile,
    navigateToProfile,
    user,
    isLoggedIn,
    notificationModalVisible,
    hideNotificationModal,
  };
};

export default useMyAccount;
