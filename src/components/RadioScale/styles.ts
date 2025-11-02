import styled from 'styled-components/native';
import {moderateScale} from '../../utils/scales';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: ${moderateScale(16)}px;
  background-color: ${({theme}) => theme.colors.gray_01};
  border-radius: ${moderateScale(12)}px;
`;

export const ScaleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: ${moderateScale(16)}px;
`;

export const ScaleItem = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;

export const Circle = styled.View<{selected: boolean}>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({theme, selected}) =>
    selected ? theme.colors.purple_04 : theme.colors.gray_05};
  align-items: center;
  justify-content: center;
  margin-top: ${moderateScale(4)}px;
`;

export const FilledCircle = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({theme}) => theme.colors.purple_04};
`;
