import styled from 'styled-components/native';
import {horizontalScale} from '../../../../../utils/scales';

export const ActionsRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RightActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(12)}px;
`;

export const LikeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(4)}px;
`;

export const RepostButtonContainer = styled.View``;
