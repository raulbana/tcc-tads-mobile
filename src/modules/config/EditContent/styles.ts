import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(12)}px;
`;
