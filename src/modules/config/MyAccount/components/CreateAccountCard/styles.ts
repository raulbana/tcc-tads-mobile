import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  padding: ${moderateScale(12)}px;
  border: ${moderateScale(1)}px solid ${({theme}) => theme.colors.gray_04};
  gap: ${verticalScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({theme}) => theme.colors.white};
`;

export const Section = styled.View`
  flex-direction: column;
  gap: ${verticalScale(12)}px;
  width: 100%;
`;

export const AvatarCircle = styled.View`
  width: ${horizontalScale(32)}px;
  height: ${verticalScale(32)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({theme}) => theme.colors.pastel_green};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: ${horizontalScale(40)}px;
  height: ${verticalScale(40)}px;
  border-radius: ${moderateScale(20)}px;
`;

export const Divider = styled.View`
  width: 100%;
  height: ${verticalScale(1)}px;
  background-color: ${({theme}) => theme.colors.gray_04};
`;

export const AdvantageRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;
