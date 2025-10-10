import styled from 'styled-components/native';
import {verticalScale} from '../../utils/scales';

export const Container = styled.View`
  gap: ${verticalScale(16)}px;
`;

export const ExerciseTitle = styled.View`
  margin-bottom: ${verticalScale(8)}px;
`;

export const ExerciseDescription = styled.View`
  margin-bottom: ${verticalScale(12)}px;
`;
