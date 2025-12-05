import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../../utils/scales';

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

export const ProgressContainer = styled.View`
  margin-bottom: ${verticalScale(16)}px;
  gap: ${verticalScale(8)}px;
`;

export const NextWorkoutSection = styled.View`
  margin-bottom: ${verticalScale(24)}px;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  background-color: ${({theme}) => theme.colors.purple_01 || '#F3E8FF'};
  border-radius: ${verticalScale(12)}px;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.purple_02 || '#9657B3'};
  gap: ${verticalScale(8)}px;
`;
