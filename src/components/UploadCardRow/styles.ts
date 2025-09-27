import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';
import theme from '../../theme/theme';

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(12)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${theme.colors.gray_02};
`;

export const IconWrapper = styled.View`
  width: ${horizontalScale(40)}px;
  height: ${horizontalScale(40)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.purple_01};
`;

export const InfoWrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(4)}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${horizontalScale(4)}px;
`;
