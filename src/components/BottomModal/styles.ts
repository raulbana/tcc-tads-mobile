import styled from 'styled-components/native';
import {horizontalScale, moderateScale, verticalScale} from '../../utils/scales';
import {Dimensions, StyleSheet} from 'react-native';

const screenW = Dimensions.get('window').width;

export const Root = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  z-index: 9999;
`;

export const backdropStyle = StyleSheet.create({
  base: {},
}).base;

export const animatedSheetStyle = StyleSheet.create({
  base: {width: '100%'},
}).base;

export const Container = styled.View`
  width: ${screenW}px;
  background-color: ${({theme}) => theme.colors.white};
  border-top-left-radius: ${moderateScale(16)}px;
  border-top-right-radius: ${moderateScale(16)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(16)}px ${verticalScale(16)}px;
  gap: ${verticalScale(12)}px;
  align-self: center;
`;

export const Handle = styled.View`
  align-self: center;
  width: ${horizontalScale(48)}px;
  height: ${verticalScale(4)}px;
  border-radius: ${moderateScale(2)}px;
  background-color: ${({theme}) => theme.colors.gray_04};
  margin-bottom: ${verticalScale(4)}px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderSpacer = styled.View`
  height: ${verticalScale(20)}px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: ${verticalScale(4)}px;
`;

export const Content = styled.View`
  width: 100%;
  gap: ${verticalScale(12)}px;
`;

export const Footer = styled.View`
  width: 100%;
  padding-top: ${verticalScale(8)}px;
  gap: ${verticalScale(8)}px;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.gray_03};
`;