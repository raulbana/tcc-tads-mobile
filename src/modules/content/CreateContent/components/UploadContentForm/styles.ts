import styled from 'styled-components/native';
import { verticalScale } from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  padding: ${verticalScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const FormContainer = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
`;

export const FieldGroup = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(8)}px;
`;