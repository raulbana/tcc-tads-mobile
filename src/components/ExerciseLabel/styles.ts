import styled from 'styled-components/native';
import {ExerciseStatus} from '../../types/exercise';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

interface ExerciseLabelProps {
  type: ExerciseStatus;
  backgroundColor: string;
}

export const Container = styled.View<ExerciseLabelProps>`
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${moderateScale(6)}px;
  padding-horizontal: ${horizontalScale(6)}px;
  padding-vertical: ${verticalScale(4)}px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  min-width: auto;
`;
