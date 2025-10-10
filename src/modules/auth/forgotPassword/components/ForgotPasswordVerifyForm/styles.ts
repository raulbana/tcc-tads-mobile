import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  padding: ${verticalScale(24)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(16)}px;
  ]flex: 1;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: flex-end;
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const ButtonsSection = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
`;
