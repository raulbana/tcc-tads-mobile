import styled from "styled-components/native";
import { ExerciseStatus } from "../../types/exercise";
import { ExerciseLabelProps } from "./ExerciseLabel";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/scales";
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

const theme = useDynamicTheme();

const getBackgroundColor = (type: ExerciseStatus) => {
  switch (type) {
    case 'COMPLETED':
      return theme.colors.purple_03;
    case 'PENDING':
      return theme.colors.purple_02;
    case 'IN_PROGRESS':
      return theme.colors.purple_04;
    default:
      return theme.colors.purple_01;
  }
};

export const Container = styled.View<ExerciseLabelProps>`
    background-color: ${({ type }) => getBackgroundColor(type)};
    border-radius: ${moderateScale(6)}px;
    padding-horizontal: ${horizontalScale(6)}px;
    padding-vertical: ${verticalScale(4)}px;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    min-width: auto;
`;