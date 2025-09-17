import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../../../../utils/scales';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  width: 100%;
`;

export const ThumbnailPressable = styled.TouchableOpacity`
  margin: ${moderateScale(8)}px;
`;

export const ThumbnailImage = styled.Image`
  width: ${horizontalScale(80)}px;
  height: ${verticalScale(80)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const FullImage = styled.Image`
  width: ${width}px;
  height: ${height * 0.6}px;
`;

export const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: ${verticalScale(40)}px;
  right: ${horizontalScale(20)}px;
  padding: ${moderateScale(10)}px;
`;

export const LeftArrow = styled.TouchableOpacity`
  position: absolute;
  left: ${horizontalScale(20)}px;
  top: 50%;
`;

export const RightArrow = styled.TouchableOpacity`
  position: absolute;
  right: ${horizontalScale(20)}px;
  top: 50%;
`;
