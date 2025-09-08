import {useNavigation} from '@react-navigation/native';
import theme from '../../../theme/theme';
import {moderateScale} from '../../../utils/scales';
import {OptionItem} from './components/OptionsList/OptionsList';
import {NavigationStackProp} from '../../../navigation/routes';

const useMyAccount = () => {
  const {navigate} = useNavigation<NavigationStackProp>();

  const navigateToAccessibilitySettings = () => {
    navigate('Config', {screen: 'AccessibilitySettings'});
  };

  const navigateToTalkToUs = () => {
    navigate('Config', {screen: 'TalkToUs'});
  };

  const options: OptionItem[] = [
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
      onPress: () => {},
    },
    {
      label: 'Sobre o Aplicativo',
      icon: {
        name: 'Info',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
      onPress: () => {},
    },
    {
      label: 'Sair',
      icon: {
        name: 'SignOut',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
      onPress: () => {},
    },
  ];

  const advantages: string[] = [
    'Personalização de treino',
    'Conteúdos exclusivos',
    'Acompanhamento de progresso',
    'Comunidade e suporte',
    'Relatórios detalhados',
  ];

  return {options, advantages, navigateToTalkToUs};
};

export default useMyAccount;
