import React from 'react';
import {LeakageLevel} from '../../../../types/diary';
import * as S from './styles';
import Label from '../../../Label/Label';
import theme from '../../../../theme/theme';

export interface DayItem {
  dayTitle: string;
  dayNumber: number;
  date: Date;
  isToday?: boolean;
  level?: LeakageLevel;
}

export interface CalendarTileProps {
  dayItem: DayItem;
  isSelected?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  width?: number;
}

const CalendarTile: React.FC<CalendarTileProps> = props => {
  const {dayItem, isSelected} = props;
  const {dayTitle, dayNumber, isToday} = dayItem;

  return (
    <S.Wrapper {...props}>
      <Label
        text={dayTitle}
        typography={
          isToday || isSelected
            ? theme.typography.paragraph.sb1
            : theme.typography.paragraph.r1
        }
        color={theme.colors.gray_08}
      />
      <Label
        text={dayNumber.toString()}
        typography={theme.typography.paragraph.sb3}
        color={
          isSelected || isToday ? theme.colors.gray_08 : theme.colors.gray_06
        }
      />
      <S.Badge {...props} />
    </S.Wrapper>
  );
};

export default CalendarTile;
