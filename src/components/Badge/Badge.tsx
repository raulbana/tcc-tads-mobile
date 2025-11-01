import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export interface BadgeProps {
  content: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Badge: React.FC<BadgeProps> = props => {
  const {
    content,
    textColor,
    disabled,
    isActive,
    numberOfLines,
    ellipsizeMode,
    backgroundColor,
  } = props;

  const theme = useDynamicTheme();

  return (
    <S.BadgeContainer
      {...props}
      disabled={disabled}
      isActive={isActive}
      backgroundColor={isActive ? theme.colors.purple_02 : backgroundColor}>
      <Label
        color={textColor || theme.colors.gray_08}
        typography={theme.typography.paragraph.m0}
        text={content}
        ellipsizeMode={ellipsizeMode}
      />
    </S.BadgeContainer>
  );
};

export default Badge;
