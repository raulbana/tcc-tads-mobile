import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import theme from '../../theme/theme';

export interface BadgeProps {
  content: string | React.FC;
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
  const {content, textColor, disabled, isActive, numberOfLines, ellipsizeMode, backgroundColor} =
    props;
  return (
    <S.BadgeContainer
      {...props}
      disabled={disabled}
      isActive={isActive}
      backgroundColor={isActive ? theme.colors.purple_02 : backgroundColor}>
      {typeof content === 'string' ? (
        <Label
          color={textColor || theme.colors.gray_08}
          typography={theme.typography.paragraph.m2}
          text={content}
          ellipsizeMode={ellipsizeMode}
        />
      ) : (
        React.createElement(content)
      )}
    </S.BadgeContainer>
  );
};

export default Badge;
