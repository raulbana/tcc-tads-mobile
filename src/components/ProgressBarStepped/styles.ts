import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
}

export const ProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Step = styled.View<StepProps>`
  flex: 1;
  height: ${verticalScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  margin: ${horizontalScale(0)} ${verticalScale(2)}px;
  background-color: ${({isActive, isCompleted, theme}) =>
    isCompleted
      ? theme.colors.purple_03
      : isActive
      ? theme.colors.purple_04
      : theme.colors.gray_04};
`;
