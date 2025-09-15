import styled from 'styled-components/native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.gray_01};
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: ${verticalScale(240)}px;
  justify-content: flex-start;
`;

export const BackButtonContainer = styled.View`
  position: absolute;
  top: ${verticalScale(48)}px;
  left: ${horizontalScale(16)}px;
  z-index: 2;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
