import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../../../utils/scales';

export const FormContainer = styled.View`
  padding-vertical: ${verticalScale(16)}px;
  flex: 1;
  width: 100%;
  gap: ${verticalScale(16)}px;
`;

export const FieldGroup = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const ButtonContainer = styled.View`
  padding-horizontal: ${horizontalScale(16)}px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${verticalScale(16)}px;
`;
