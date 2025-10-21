import styled from "styled-components/native";
import RecommendationIllustration from "../../../../../assets/illustrations/recommendation_illustration.svg";
import { horizontalScale, moderateScale, verticalScale } from "../../../../../utils/scales";

export const Illustration = styled(RecommendationIllustration).attrs({})``;

export const Container = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.purple_01};
  border-radius: ${moderateScale(12)}px;
  gap: ${horizontalScale(16)}px;
  padding: ${moderateScale(16)}px;
  overflow: hidden;
`

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${verticalScale(16)}px;
  width: 60%;
  `

export const TextRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`

export const IllustrationContainer = styled.View`
  width: 40%;
  justify-content: center;
  align-items: center;
`