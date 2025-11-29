import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  padding: ${verticalScale(16)}px;
  gap: ${verticalScale(16)}px;
  flex: 1;
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

export const ButtonContainer = styled.View`
  flex: 1;
  display: flex;
  width: 100%;
  padding-horizontal: ${horizontalScale(16)}px;
  justify-content: flex-end;
`;

export const CategoryLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
