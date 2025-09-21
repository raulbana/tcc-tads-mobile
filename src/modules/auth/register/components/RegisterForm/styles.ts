import styled from 'styled-components/native';
import { verticalScale, horizontalScale } from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  padding: ${verticalScale(24)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const TermsRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(16)}px;
  margin-vertical: ${verticalScale(4)}px;
`;

export const TermsSwitch = styled.Switch``;
