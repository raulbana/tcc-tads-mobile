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
  border: 2px solid ${({theme}) => theme.colors.purple_04};
  background-color: ${({isReposted, theme}) =>
    isReposted ? theme.colors.purple_04 : 'transparent'};
  border-radius: ${horizontalScale(8)}px;
`;
