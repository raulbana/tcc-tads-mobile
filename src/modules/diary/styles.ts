import styled from "styled-components/native";
import { verticalScale } from "../../utils/scales";

export const Wrapper = styled.View`
  flex: 1;
  display: flex;
  gap: ${verticalScale(24)}px;
`;
