import styled from 'styled-components/native';
import { verticalScale, horizontalScale } from '../../../../../utils/scales';

export const Container = styled.View`
  gap: ${verticalScale(16)}px;
  width: 100%;
`;

export const CheckboxRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(16)}px;
  margin-bottom: ${verticalScale(8)}px;
`;
