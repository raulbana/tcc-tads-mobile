import React from 'react';
import {TextStyle, StyleProp} from 'react-native';
import {TextProps as TypographyProps} from '../../theme';
import * as S from './styles';

interface LabelProps {
  typography: TypographyProps;
  text?: string;
  children?: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  textBreakStrategy?: 'simple' | 'highQuality' | 'balanced';
  lineBreakMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Label: React.FC<LabelProps> = ({
  typography,
  text,
  children,
  color = '#000',
  style,
  textAlign = 'left',
  numberOfLines,
  ellipsizeMode = 'tail',
  selectable = false,
  adjustsFontSizeToFit = false,
  allowFontScaling = true,
  textDecorationLine,
  textBreakStrategy = 'balanced',
  lineBreakMode,
}) => {
  return (
    <S.StyledText
      typography={typography}
      color={color}
      style={style}
      textAlign={textAlign}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      textDecorationLine={textDecorationLine}
      textBreakStrategy={textBreakStrategy}
      lineBreakMode={lineBreakMode}>
      {text}
      {children}
    </S.StyledText>
  );
};

export default Label;
