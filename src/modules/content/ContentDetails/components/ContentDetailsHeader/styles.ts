import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../../../../utils/scales';
import LinearGradient from 'react-native-linear-gradient';

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

export const GradientOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0)'],
  locations: [0, 0.6, 1],
  end: {x: 0.5, y: 1},
  start: {x: 0.5, y: 0},
})`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const ReportButtonContainer = styled.View`
  position: absolute;
  top: ${verticalScale(48)}px;
  right: ${horizontalScale(16)}px;
  z-index: 2;
`;

export const ReportButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${verticalScale(8)}px;
`;
