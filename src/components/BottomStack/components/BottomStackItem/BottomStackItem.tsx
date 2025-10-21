import React from 'react';
import * as S from './styles';
import Label from '../../../Label/Label';
import {BottomStackItemConfig} from '../../useBottomStack';
import { useDynamicTheme } from '../../../../hooks/useDynamicTheme';

interface BottomStackItemProps {
  item: BottomStackItemConfig;
  focused: boolean;
  onPress: () => void;
  activeColor: string;
  inactiveColor: string;
}

const BottomStackItem: React.FC<BottomStackItemProps> = ({
  item,
  focused,
  onPress,
  activeColor,
  inactiveColor,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.ItemButton
      accessibilityRole="button"
      accessibilityState={focused ? {selected: true} : {}}
      accessibilityLabel={item.label}
      onPress={onPress}
      activeOpacity={0.7}
      focused={focused}>
      {item.icon(
        focused,
        focused ? theme.colors.purple_03 : theme.colors.gray_06,
      )}
      <Label
        text={item.label}
        typography={theme.typography.paragraph.sb1}
        color={focused ? theme.colors.purple_03 : theme.colors.gray_06}
        textAlign="center"
      />
    </S.ItemButton>
  );
};

export default BottomStackItem;
