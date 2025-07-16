import styled from 'styled-components/native';
import {horizontalScale} from '../../../../../utils/scales';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${horizontalScale(8)}px;
`;
