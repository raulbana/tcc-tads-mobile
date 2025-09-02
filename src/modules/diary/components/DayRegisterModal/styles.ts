import styled from "styled-components/native";
import RegisterSheets from "../../../../assets/illustrations/register_sheets.svg"
import { verticalScale } from "../../../../utils/scales";
import { SvgProps } from "react-native-svg";

export const EmptyDataContainer = styled.View`
    align-items: center;
    justify-content: center;
    min-height: ${verticalScale(200)}px;
    gap: ${verticalScale(16)}px;
`

export const IllustrationSheet = styled(
  RegisterSheets as React.ComponentType<SvgProps>,
).attrs({
})``;

export const Wrapper = styled.View`
  padding-vertical: ${verticalScale(16)}px;
`