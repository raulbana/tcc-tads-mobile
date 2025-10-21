import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/scales';
import {CalendarTileProps} from './CalendarTile';

export const Wrapper = styled.TouchableOpacity<CalendarTileProps>`
  padding-horizontal: ${horizontalScale(8)}px;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${verticalScale(4)}px;
  background-color: ${({dayItem, theme}) =>
    dayItem.isToday ? theme.colors.purple_02 : theme.colors.gray_03};
  align-items: center;

  ${({width}) => (width ? `width: ${Math.max(0, Math.floor(width))}px;` : '')}
`;

interface BadgeProps extends CalendarTileProps {
  badgeColor: string;
}

export const Badge = styled.View<BadgeProps>`
  width: 100%;
  height: ${horizontalScale(4)}px;
  border-radius: ${horizontalScale(4)}px;
  background-color: ${({badgeColor}) => badgeColor};
`;
