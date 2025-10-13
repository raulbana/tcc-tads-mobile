import styled from 'styled-components/native';
import {moderateScale} from '../../utils/scales';

export const Container = styled.View`
  width: 100%;
  gap: ${moderateScale(12)}px;
`;

export const OptionButton = styled.TouchableOpacity<{selected: boolean}>`
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.purple_02 : theme.colors.gray_01};
  border-width: ${moderateScale(1)}px;
  border-color: ${({selected, theme}) =>
    selected ? theme.colors.purple_03 : theme.colors.gray_05};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(12)}px;
  padding-horizontal: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
`;
