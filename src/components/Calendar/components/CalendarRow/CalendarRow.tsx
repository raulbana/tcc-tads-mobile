import React from 'react';
import * as S from './styles';
import Animated from 'react-native-reanimated';
import {useCalendarRow, ITEM_WIDTH, SPACING} from './useCalendarRow';
import CalendarRowItem from './components/CalendarRowItem';
import { CalendarDayData } from '../../../../types/diary';

const days: CalendarDayData[] = [
  {dayTitle: 'Dom', dayNumber: 11, level: 'LOW', date: new Date()},
  {dayTitle: 'Seg', dayNumber: 12, level: 'MEDIUM', date: new Date()},
  {dayTitle: 'Ter', dayNumber: 13, level: 'HIGH', date: new Date()},
  {dayTitle: 'Quarta', dayNumber: 14, isToday: true, date: new Date()},
  {dayTitle: 'Qui', dayNumber: 15, date: new Date()},
  {dayTitle: 'Sex', dayNumber: 16, date: new Date()},
  {dayTitle: 'Sáb', dayNumber: 17, date: new Date()},
];

const CalendarRow = () => {
  const {scrollX, scrollHandler} = useCalendarRow();

  return (
    <S.Container>
      <Animated.FlatList
        data={days}
        keyExtractor={item => item.dayTitle}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 16}}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({item, index}) => (
          <CalendarRowItem dayItem={item} index={index} scrollX={scrollX} />
        )}
      />
    </S.Container>
  );
};

export default CalendarRow;
