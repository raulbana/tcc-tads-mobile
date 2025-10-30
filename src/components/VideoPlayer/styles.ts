import Video from 'react-native-video';
import styled from 'styled-components/native';
import {verticalScale} from '../../utils/scales';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 250px;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const VideoPlayer = styled(Video)`
  width: 100%;
  height: 100%;
`;

export const Overlay = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const PlayButton = styled.Text`
  position: absolute;
  font-size: 50px;
  color: white;
  opacity: 0.8;
`;
