import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.gray_02};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(12)}px;
  border: ${moderateScale(1)}px solid ${({theme}) => theme.colors.gray_04};
`;

export const Section = styled.View`
  gap: ${verticalScale(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AvatarCircle = styled.View`
  width: ${horizontalScale(48)}px;
  height: ${verticalScale(48)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({theme}) => theme.colors.gray_03};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const profileImageStyle = {
  width: horizontalScale(48),
  height: verticalScale(48),
  borderRadius: moderateScale(24),
};

export const EditButtonStyle = styled.TouchableOpacity`
  padding: ${verticalScale(8)}px;
  align-self: flex-start;
  margin: auto;
`;
