import styled from 'styled-components/native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../../../utils/scales';

export const FormContainer = styled.View`
  padding-vertical: ${verticalScale(16)}px;
  width: 100%;
  gap: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(100)}px;
`;

export const FieldGroup = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const ButtonContainer = styled.View`
  padding-horizontal: ${horizontalScale(16)}px;
  width: 100%;
  align-items: center;
  margin-top: ${verticalScale(24)}px;
  margin-bottom: ${verticalScale(16)}px;
  position: relative;
  min-height: ${verticalScale(50)}px;
`;

export const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: ${moderateScale(10)}px;
`;

export const SuccessMessage = styled.View`
  background-color: #f6ffed;
  border: ${moderateScale(1)}px solid #b7eb8f;
  border-radius: ${moderateScale(8)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
`;
