import styled from 'styled-components/native';
import { verticalScale } from '../../utils/scales';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex:1;
  gap: ${verticalScale(16)}px;
`;
