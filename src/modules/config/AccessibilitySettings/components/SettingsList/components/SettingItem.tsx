import React from 'react';
import * as S from './styles';
import Label from '../../../../../../components/Label/Label';
import theme from '../../../../../../theme/theme';
import SwitchToggle from '../../../../../../components/SwitchToggle/SwitchToggle';

export interface SettingItemProps {
  isLastItem: boolean;
  isToggled: boolean;
  label: string;
  onToggle: (value: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  isLastItem,
  isToggled,
  label,
  onToggle,
}) => {
  return (
    <S.Item isLastItem={isLastItem}>
      <Label
        text={label}
        typography={theme.typography.paragraph.r2}
        color={theme.colors.gray_07}
      />
      <SwitchToggle value={isToggled} onValueChange={onToggle} />
    </S.Item>
  );
};

export default SettingItem;
