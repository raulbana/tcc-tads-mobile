import styled from "styled-components/native";
import { horizontalScale, moderateScale, verticalScale } from "../../../../utils/scales";

export const Container = styled.View`
    width: 100%;
    padding: ${moderateScale(16)}px;
    gap: ${verticalScale(16)}px;
    background-color: ${({ theme }) => theme.colors.gray_03};
    border-radius: ${moderateScale(12)}px;
`

export const HeaderRow = styled.View`
    flex-direction: row;
    gap: ${horizontalScale(8)}px;
`