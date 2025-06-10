import styled from 'styled-components/native';
import {TextProps as TypographyProps} from '../../theme';

export const StyledText = styled.Text<{
  typography: TypographyProps;
  color: string;
}>`
  font-size: ${({typography}) => Number(typography.fontSize)}px;
  font-weight: ${({typography}) => typography.fontWeight};
  font-family: ${({typography}) => typography.fontFamily};
  color: ${({color}) => color};
  ${({typography}) =>
    typography.lineHeight
      ? `line-height: ${Number(typography.lineHeight)}px;`
      : ''}
  ${({typography}) =>
    typography.letterSpacing
      ? `letter-spacing: ${Number(typography.letterSpacing)}px;`
      : ''}
  ${({typography}) =>
    typography.textTransform
      ? `text-transform: ${typography.textTransform};`
      : ''}
`;
