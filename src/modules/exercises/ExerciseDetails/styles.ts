import styled from "styled-components/native";
import { verticalScale, horizontalScale } from "../../../utils/scales";

export const Container = styled.View`
  flex: 1;
  gap: ${verticalScale(24)}px;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
`;

export const Header = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const BadgeContainer = styled.View`
  align-self: flex-start;
`;

export const Title = styled.View`
  margin-top: ${verticalScale(4)}px;
`;

export const StartWorkoutButton = styled.View`
  align-items: center;
  justify-content: center;
`;