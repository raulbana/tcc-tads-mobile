import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const Container = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(12)}px;
  padding: ${verticalScale(8)}px ${horizontalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({theme}) => theme.colors.gray_02};
  border: ${moderateScale(1)}px solid ${({theme}) => theme.colors.gray_04};
`;

export const IconWrapper = styled.View`
  width: ${horizontalScale(40)}px;
  height: ${horizontalScale(40)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.purple_01};
`;

export const InfoWrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(4)}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${horizontalScale(4)}px;
`;
