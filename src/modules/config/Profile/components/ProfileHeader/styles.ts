import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../utils/scales';
import {ImageStyle} from 'react-native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(20)}px;
  gap: ${verticalScale(16)}px;
  shadow-color: ${({theme}) => theme.colors.gray_08};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ProfileSection = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(16)}px;
  align-items: flex-start;
`;

export const AvatarContainer = styled.View`
  width: ${moderateScale(80)}px;
  height: ${moderateScale(80)}px;
  border-radius: ${moderateScale(40)}px;
  background-color: ${({theme}) => theme.colors.gray_03};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const profileImageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
};

export const InfoContainer = styled.View`
  flex: 1;
  gap: ${verticalScale(8)}px;
`;

export const NameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(24)}px;
  margin-top: ${verticalScale(8)}px;
  justify-content: space-between;
`;

export const StatItem = styled.View`
  align-items: center;
  gap: ${verticalScale(2)}px;
`;

export const BioContainer = styled.View`
  gap: ${verticalScale(4)}px;
`;

export const ActionContainer = styled.View`
  margin-top: ${verticalScale(8)}px;
`;
