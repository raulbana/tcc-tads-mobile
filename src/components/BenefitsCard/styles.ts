import styled from "styled-components/native";
import { verticalScale, horizontalScale } from "../../utils/scales";

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.gray_03};
  border-radius: ${horizontalScale(12)}px;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(12)}px;
`;

export const TitleContainer = styled.View`
  margin-bottom: ${verticalScale(4)}px;
`;

export const BenefitsList = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const BenefitItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${horizontalScale(12)}px;
`;

export const CheckIconContainer = styled.View`
  margin-top: ${verticalScale(2)}px;
`;

export const BenefitContent = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;
