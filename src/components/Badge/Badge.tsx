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
}

const Badge: React.FC<BadgeProps> = props => {
  const {content, textColor} = props;
  return (
    <S.BadgeContainer {...props}>
      {typeof content === 'string' ? (
        <Label
          color={textColor || theme.colors.gray_08}
          typography={theme.typography.paragraph.m2}
          text={content}
        />
      ) : (
        React.createElement(content)
      )}
    </S.BadgeContainer>
  );
};

export default Badge;
