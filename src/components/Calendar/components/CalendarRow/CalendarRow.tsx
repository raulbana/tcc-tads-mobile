import React from 'react';
import * as S from './styles';
import Animated from 'react-native-reanimated';
import {useCalendarRow, ITEM_WIDTH, SPACING} from './useCalendarRow';
import CalendarRowItem from './components/CalendarRowItem';

const CalendarRow = () => {
  const {scrollX, scrollHandler, days} = useCalendarRow();

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
        initialScrollIndex={3}
        renderItem={({item, index}) => (
          <CalendarRowItem dayItem={item} index={index} scrollX={scrollX} />
        )}
      />
    </S.Container>
  );
};

export default CalendarRow;
