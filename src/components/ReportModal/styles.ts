import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const Container = styled.View`
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const InputContainer = styled.View`
  margin-top: ${verticalScale(8)}px;
`;

export const ErrorContainer = styled.View`
  margin-top: ${verticalScale(-8)}px;
`;

export const ButtonContainer = styled.View`
  gap: ${horizontalScale(12)}px;
  margin-top: ${verticalScale(8)}px;
`;
