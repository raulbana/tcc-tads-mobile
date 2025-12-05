import styled from 'styled-components/native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../utils/scales';

export const Outer = styled.View`
  width: 100%;
  align-items: center;
  padding-horizontal: ${horizontalScale(16)}px;
  padding-vertical: ${verticalScale(24)}px;
  background-color: ${({theme}) => theme.colors.white};
`;

export const LogoWrapper = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const SeparatorRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
  justify-content: center;
  margin-vertical: ${verticalScale(12)}px;
`;

export const Line = styled.View`
  flex: 1;
  height: ${moderateScale(1)}px;
  background-color: ${({theme}) => theme.colors.gray_04};
`;

export const FooterRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${horizontalScale(6)}px;
`;

export const LinkPressable = styled.TouchableOpacity``;
