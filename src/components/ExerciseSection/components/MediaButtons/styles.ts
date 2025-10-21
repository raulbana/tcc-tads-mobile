import styled from "styled-components/native";
import { horizontalScale, verticalScale } from "../../../../utils/scales";

export const Container = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(12)}px;
  margin-top: ${verticalScale(16)}px;
`;

export const Button = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${horizontalScale(8)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(16)}px;
  background-color: ${({ isActive, theme }) => 
    isActive ? theme.colors.purple_04 : theme.colors.purple_02
  };
  border-radius: ${horizontalScale(8)}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
