import theme from '../../../theme/theme';
import {moderateScale} from '../../../utils/scales';
import {OptionItem} from './components/OptionsList/OptionsList';

const useMyAccount = () => {
  const options: OptionItem[] = [
    {
      label: 'Acessibilidade',
      icon: {
        name: 'Wheelchair',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
    },
    {
      label: 'Notificações',
      icon: {
        name: 'Bell',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
    },
    {
      label: 'Sobre o Aplicativo',
      icon: {
        name: 'Info',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
    },
    {
      label: 'Sair',
      icon: {
        name: 'SignOut',
        size: moderateScale(24),
        color: theme.colors.gray_07,
      },
    },
  ];

  const advantages: string[] = [
    'Personalização de treino',
    'Conteúdos exclusivos',
    'Acompanhamento de progresso',
    'Comunidade e suporte',
    'Relatórios detalhados',
  ];

  return {options, advantages};
};

export default useMyAccount;
