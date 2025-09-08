import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const ButtonContainer = styled.View`
  padding-horizontal: ${horizontalScale(16)}px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${verticalScale(16)}px;
`;
