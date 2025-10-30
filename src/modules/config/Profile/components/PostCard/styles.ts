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
  padding: ${verticalScale(16)}px;
  gap: ${verticalScale(12)}px;
  shadow-color: ${({theme}) => theme.colors.gray_08};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PostInfo = styled.View`
  flex: 1;
  gap: ${verticalScale(4)}px;
`;

export const ContentContainer = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const MediaContainer = styled.View`
  border-radius: ${moderateScale(8)}px;
  overflow: hidden;
`;

export const mediaImageStyle: ImageStyle = {
  width: '100%',
  height: 200,
  resizeMode: 'cover',
};

export const Footer = styled.View`
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.gray_04};
  padding-top: ${verticalScale(12)}px;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(16)}px;
`;

export const StatItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(4)}px;
`;

export const deleteButtonStyle = {
  padding: 8,
  borderRadius: 6,
  backgroundColor: 'transparent',
};
