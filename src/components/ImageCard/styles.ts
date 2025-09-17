import styled from 'styled-components/native';
import {moderateScale} from '../../utils/scales';

export const Container = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1.6;
  border-radius: ${moderateScale(16)}px;
  overflow: hidden;
`;

export const BackgroundImage = styled.Image`
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
`;
