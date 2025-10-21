import React from 'react';
import {CalendarDayDTO} from '../../../../types/diary';
import * as S from './styles';
import Label from '../../../Label/Label';
import {useDynamicTheme} from '../../../../hooks/useDynamicTheme';
import useCalendarTile from './useCalendarTile';

export interface CalendarTileProps {
  dayItem: CalendarDayDTO;
  isSelected?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  width?: number;
}

const CalendarTile: React.FC<CalendarTileProps> = props => {
  const theme = useDynamicTheme();
  const {getBadgeColor} = useCalendarTile();
  const {dayItem, isSelected, isDisabled} = props;
  const {dayTitle, dayNumber, isToday} = dayItem;

  const badgeColor = isToday
    ? theme.colors.default_green
    : getBadgeColor(dayItem.leakageLevel);

  return (
    <S.Wrapper {...props} disabled={isDisabled}>
      <Label
        text={dayTitle}
        typography={
          isToday || isSelected
            ? theme.typography.paragraph.sb1
            : theme.typography.paragraph.r1
        }
        color={isDisabled ? theme.colors.gray_06 : theme.colors.gray_08}
      />
      <Label
        text={dayNumber.toString()}
        typography={theme.typography.paragraph.sb3}
        color={
          isSelected || isToday ? theme.colors.gray_08 : theme.colors.gray_06
        }
      />
      <S.Badge {...props} badgeColor={badgeColor} />
    </S.Wrapper>
  );
};

export default CalendarTile;
