import React, {useMemo} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {CaretLeft, CaretRight} from 'phosphor-react-native';
import CalendarTile, {
  DayItem,
} from '../../../../components/Calendar/components/CalendarTile/CalendarTile';
import Label from '../../../../components/Label/Label';
import theme from '../../../../theme/theme';
import {horizontalScale} from '../../../../utils/scales';
import {useCalendar} from './useCalendar';
import * as S from './styles';
import Loader from '../../../../components/Loader/Loader';

const COLUMNS = 6;
const CELL_GAP = horizontalScale(8);
const PADDING_H = horizontalScale(16);

const Calendar: React.FC = () => {
  const {width: screenWidth} = useWindowDimensions();
  const tileWidth = Math.floor(
    (screenWidth - PADDING_H * 2 - CELL_GAP * (COLUMNS - 1)) / COLUMNS,
  );

  const {monthLabel, daysFlat, goPrevMonth, goNextMonth} = useCalendar();

  const rows = useMemo(() => {
    const out: DayItem[][] = [];
    for (let i = 0; i < daysFlat.length; i += COLUMNS) {
      out.push(daysFlat.slice(i, i + COLUMNS));
    }
    return out;
  }, [daysFlat]);

  return (
    <S.Container>
      <S.Header>
        <S.NavButton onPress={goPrevMonth} accessibilityLabel="Mês anterior">
          <CaretLeft color={theme.colors.gray_07} size={20} />
        </S.NavButton>
        <Label
          text={monthLabel}
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
        />
        <S.NavButton onPress={goNextMonth} accessibilityLabel="Próximo mês">
          <CaretRight color={theme.colors.gray_07} size={20} />
        </S.NavButton>
      </S.Header>

      <S.Grid>
        {rows.map((row, idx) => {
          const isLast = idx === rows.length - 1;
          const shouldCenter = isLast && row.length < COLUMNS;
          return (
            <S.Row key={`row-${idx}`} $center={shouldCenter}>
              {row.map((item, j) => (
                <View
                  key={`${item.date.toISOString()}-${j}`}
                  style={{width: tileWidth}}>
                  <CalendarTile dayItem={item} width={tileWidth} />
                </View>
              ))}
            </S.Row>
          );
        })}
      </S.Grid>
    </S.Container>
  );
};

export default Calendar;
