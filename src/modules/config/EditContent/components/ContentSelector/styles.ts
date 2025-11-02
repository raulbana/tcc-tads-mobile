import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  flex: 1;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const CardContainer = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.gray_02};
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  border: ${moderateScale(1)}px solid ${({theme}) => theme.colors.gray_04};
`;

export const Thumbnail = styled.Image`
  width: ${horizontalScale(100)}px;
  height: ${verticalScale(100)}px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: ${verticalScale(12)}px ${horizontalScale(12)}px;
  gap: ${verticalScale(8)}px;
`;

export const CategoryBadge = styled.View`
  align-self: flex-start;
  padding: ${verticalScale(4)}px ${horizontalScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({theme}) => theme.colors.purple_01};
`;

export const cardStyle = {
  marginBottom: verticalScale(12),
};

export const listContentStyle = {
  paddingBottom: verticalScale(16),
};
