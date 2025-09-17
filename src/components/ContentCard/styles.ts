import styled from 'styled-components/native';
import {moderateScale} from '../../utils/scales';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1.6;
  border-radius: ${moderateScale(16)}px;
  overflow: hidden;
`;

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  top: ${moderateScale(16)}px;
  left: ${moderateScale(16)}px;
  width: auto;
`;

export const Content = styled.View`
  width: 100%;
  padding: ${moderateScale(16)}px;
  z-index: 1;
`;

export const GradientOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0)'],
  locations: [0, 0.6, 1],
  start: {x: 0.5, y: 1},
  end: {x: 0.5, y: 0},
})`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;
