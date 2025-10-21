import {
  House,
  CalendarCheck,
  Barbell,
  Book,
  UserCircle,
} from 'phosphor-react-native';
import {moderateScale} from '../../utils/scales';
import {JSX} from 'react';
import Home from '../../modules/core/Home/Home';
import Diary from '../../modules/diary/Diary';
import MyAccount from '../../modules/config/MyAccount/MyAccount';
import { MainTabParamList } from '../../navigation/routes';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface BottomStackItemConfig {
  name: keyof MainTabParamList;
  label: string;
  icon: (focused: boolean, color: string, size?: number) => JSX.Element;
  component: React.FC;
}

const Placeholder: React.FC = () => null;

export const useBottomStack = () => {
  const defaultSize = moderateScale(28);
  const theme = useDynamicTheme();
  const items: BottomStackItemConfig[] = [
    {
      name: 'Home',
      label: 'Home',
      icon: (f, c, s = defaultSize) => (
        <House weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
      component: Home,
    },
    {
      name: 'Diary',
      label: 'Diário',
      icon: (f, c, s = defaultSize) => (
        <CalendarCheck weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
      component: Diary,
    },
    {
      name: 'Exercises',
      label: 'Exercícios',
      icon: (f, c, s = defaultSize) => (
        <Barbell weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
      component: Placeholder,
    },
    {
      name: 'Contents',
      label: 'Conteúdos',
      icon: (f, c, s = defaultSize) => (
        <Book weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
      component: Placeholder,
    },
    {
      name: 'MyAccount',
      label: 'Conta',
      icon: (f, c, s = defaultSize) => (
        <UserCircle weight={f ? 'fill' : 'regular'} color={c} size={s} />
      ),
      component: MyAccount,
    },
  ];
  return {
    items,
    activeColor: theme.colors.purple_04,
    inactiveColor: theme.colors.gray_07,
    iconSize: defaultSize,
  };
};
