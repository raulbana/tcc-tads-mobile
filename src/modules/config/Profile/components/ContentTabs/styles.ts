import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../utils/scales';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.gray_02};
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(4)}px;
  gap: ${moderateScale(4)}px;
`;

export const TabButton = styled(TouchableOpacity)<{active: boolean}>`
  flex: 1;
  padding: ${verticalScale(12)}px ${horizontalScale(16)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({active, theme}) =>
    active ? theme.colors.white : 'transparent'};
  align-items: center;
  justify-content: center;
`;
