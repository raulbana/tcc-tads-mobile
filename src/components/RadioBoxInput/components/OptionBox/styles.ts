import styled from 'styled-components/native'
import { moderateScale, verticalScale, horizontalScale } from '../../../../utils/scales';

export const OptionBox = styled.TouchableOpacity<{selected: boolean}>`
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.purple_02 : theme.colors.white};
  border-width: ${moderateScale(1)}px;
  border-color: ${({selected, theme}) =>
    selected ? theme.colors.purple_03 : theme.colors.gray_05};
  border-radius: ${moderateScale(12)}px;
  padding-vertical: ${verticalScale(12)}px;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;