import styled from 'styled-components/native';
import { verticalScale } from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  padding-vertical: ${verticalScale(16)}px;
  gap: ${verticalScale(24)}px;
`;
