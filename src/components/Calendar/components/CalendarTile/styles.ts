import styled from "styled-components/native";
import { horizontalScale, moderateScale, verticalScale } from "../../../../utils/scales";
import { CalendarTileProps } from "./CalendarTile";
import theme from "../../../../theme/theme";
import { LeakageLevel } from "../../../../types/diary";

const getBadgeColor = (level?: LeakageLevel) => {
    switch (level) {
        case 'NONE':
            return theme.colors.pastel_green;
        case 'LOW':
            return theme.colors.pastel_blue;
        case 'MEDIUM':
            return theme.colors.pastel_yellow;
        case 'HIGH':
            return theme.colors.pastel_red;
        default:
            return theme.colors.gray_05;
    }
}

export const Wrapper = styled.TouchableOpacity<CalendarTileProps>`
    padding-horizontal: ${horizontalScale(8)}px;
    padding-vertical: ${verticalScale(10)}px;
    border-radius: ${moderateScale(12)}px;
    gap: ${verticalScale(4)}px;
    background-color: ${({dayItem})=> dayItem.isToday ? theme.colors.purple_02 : theme.colors.gray_03};
    width: min-content;
    align-items: center;
`
export const Badge = styled.View<CalendarTileProps>`
    width: 100%;
    height: ${horizontalScale(4)}px;
    border-radius: ${horizontalScale(4)}px;
    background-color: ${({dayItem}) => dayItem.isToday ? theme.colors.default_green : getBadgeColor(dayItem.level)};
`;
