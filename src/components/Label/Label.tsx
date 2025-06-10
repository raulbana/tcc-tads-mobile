import React from 'react';
import {TextStyle} from 'react-native';
import {TextProps as TypographyProps} from '../../theme';
import * as S from './style';

interface LabelProps {
  typography: TypographyProps;
  text: string;
  children?: React.ReactNode;
  color: string;
  style?: TextStyle;
}

const Label: React.FC<LabelProps> = ({
  typography,
  text,
  children,
  color,
  style,
}) => {
  return (
    <S.StyledText typography={typography} color={color} style={style}>
      {text}
      {children}
    </S.StyledText>
  );
};

export default Label;
