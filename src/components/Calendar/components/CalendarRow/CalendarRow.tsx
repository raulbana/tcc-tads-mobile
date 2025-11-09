import React from 'react';
import * as S from './styles';
import Animated from 'react-native-reanimated';
import {useCalendarRow, ITEM_WIDTH, SPACING} from './useCalendarRow';
import CalendarRowItem from './components/CalendarRowItem';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../../navigation/routes';
import moment from 'moment';

const CalendarRow = () => {
  const {scrollX, scrollHandler, days} = useCalendarRow();
  const navigation = useNavigation<NavigationStackProp>();

  const handleDayPress = (dayItem: {date: string}) => {
    navigation.navigate('MainTabs', {
      screen: 'Diary',
      params: {selectedDate: dayItem.date},
    });
  };

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_WIDTH + SPACING,
    offset: (ITEM_WIDTH + SPACING) * index,
    index,
  });

  if (days.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <Animated.FlatList
        data={days}
        keyExtractor={(item, index) => `day-${index}-${item.dayNumber}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 16}}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        initialScrollIndex={2}
        getItemLayout={getItemLayout}
        renderItem={({item, index}) => {
          return (
            <CalendarRowItem
              dayItem={item}
              index={index}
              scrollX={scrollX}
              onPress={() => handleDayPress(item)}
              isDisabled={moment(item.date).isAfter(moment())}
            />
          );
        }}
        ListEmptyComponent={() => {
          return null;
        }}
      />
    </S.Container>
  );
};

export default CalendarRow;
