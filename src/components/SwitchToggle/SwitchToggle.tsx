import React from 'react';
import * as S from './styles';
import useSwitchToggle from './useSwitchToggle';

export interface SwitchToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  const {handlePress} = useSwitchToggle({
    value,
    onValueChange,
    disabled,
  });

  return (
    <S.Container
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{checked: value, disabled}}>
      <S.Track $checked={value} $disabled={disabled}>
        <S.Thumb $checked={value} $disabled={disabled} />
      </S.Track>
    </S.Container>
  );
};

export default SwitchToggle;
