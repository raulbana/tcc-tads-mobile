import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../../../utils/scales';
import {RepostButtonProps} from './RepostButton';

export const Button = styled.TouchableOpacity<RepostButtonProps>`
  padding-horizontal: ${horizontalScale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  flex-direction: row;
  gap: ${horizontalScale(4)}px;
  align-items: center;
  justify-content: space-between;
  background-color: 'transparent';
  border-radius: ${horizontalScale(8)}px;
`;
