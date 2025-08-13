import {
  House,
  CalendarCheck,
  Barbell,
  Book,
  UserCircle,
} from 'phosphor-react-native';
import {MainTabParamList} from '../../navigation/routes';
import theme from '../../theme/theme';
import {moderateScale} from '../../utils/scales';
import {JSX} from 'react';

export interface BottomStackItemConfig {
  name: keyof MainTabParamList;
  label: string;
  icon: (focused: boolean, color: string, size?: number) => JSX.Element;
}

export const useBottomStack = () => {
  const defaultSize = moderateScale(28);
  const items: BottomStackItemConfig[] = [
    {
      name: 'Home',
      label: 'Home',
      icon: (f, c, s = defaultSize) => (
        <House weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
    },
    {
      name: 'Diary',
      label: 'Diário',
      icon: (f, c, s = defaultSize) => (
        <CalendarCheck weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
    },
    {
      name: 'Exercises',
      label: 'Exercícios',
      icon: (f, c, s = defaultSize) => (
        <Barbell weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
    },
    {
      name: 'Contents',
      label: 'Conteúdos',
      icon: (f, c, s = defaultSize) => (
        <Book weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
    },
    {
      name: 'Account',
      label: 'Conta',
      icon: (f, c, s = defaultSize) => (
        <UserCircle weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
    },
  ];
  return {
    items,
    activeColor: theme.colors.purple_04,
    inactiveColor: theme.colors.gray_07,
    iconSize: defaultSize,
  };
};
