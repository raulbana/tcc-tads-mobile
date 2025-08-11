import styled from "styled-components/native";
import { verticalScale } from "../../../../../utils/scales";

export const Wrapper = styled.View`
    display: flex;
    flex-direction: column;
    gap: ${verticalScale(12)}px;
`;

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
