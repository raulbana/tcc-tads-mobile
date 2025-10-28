import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../../utils/scales';
import Label from '../../../components/Label/Label';

export const Wrapper = styled.View`
  flex: 1;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(24)}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${verticalScale(32)}px;
`;

export const LoadingText = styled(Label)``;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${verticalScale(32)}px;
`;

export const ErrorText = styled(Label)``;
