import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${verticalScale(24)}px ${horizontalScale(24)}px;
`;

export const IconContainer = styled.View`
  margin-bottom: ${verticalScale(32)}px;
`;

export const Title = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const Description = styled.View`
  margin-bottom: ${verticalScale(16)}px;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: ${verticalScale(12)}px;
`;
