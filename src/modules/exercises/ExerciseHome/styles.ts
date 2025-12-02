import styled from 'styled-components/native';
import { verticalScale, horizontalScale } from '../../../utils/scales';


export const Container = styled.View`
  flex: 1;
  gap: ${verticalScale(24)}px;
`;

export const RestrictedWrapper = styled.View`
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
