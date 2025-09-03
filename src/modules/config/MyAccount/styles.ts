import styled from 'styled-components/native';
import {verticalScale} from '../../../utils/scales';

export const Wrapper = styled.View`
  padding-vertical: ${verticalScale(8)}px;
  flex: 1;
  gap: ${verticalScale(16)}px;
`;
