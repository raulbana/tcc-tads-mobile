import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../utils/scales';
import {Platform} from 'react-native';

export const BarContainer = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.white};
  padding-top: ${verticalScale(8)}px;
  padding-bottom: ${verticalScale(14)}px;
  padding-horizontal: ${horizontalScale(4)}px;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.gray_03};
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-opacity: 0.06;
      shadow-radius: 8px;
      shadow-offset: 0px 2px;
    `,
    android: `elevation: 6;`,
  })}
`;