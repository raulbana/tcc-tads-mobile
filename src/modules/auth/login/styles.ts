import styled from 'styled-components/native';
import { moderateScale, verticalScale, horizontalScale } from '../../../utils/scales';

export const Outer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${moderateScale(24)}px;
  gap: ${verticalScale(16)}px;
`;

export const LogoWrapper = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(8)}px;
`;

export const SeparatorRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
  justify-content: center;
  margin-vertical: ${verticalScale(12)}px;
`;

export const FooterRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${horizontalScale(6)}px;
`;
