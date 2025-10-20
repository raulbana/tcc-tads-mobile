import styled from "styled-components/native";
import { horizontalScale, verticalScale } from "../../../../utils/scales";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${verticalScale(24)}px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${horizontalScale(8)}px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;