import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import CalendarTile from '../../CalendarTile/CalendarTile';
import {ITEM_WIDTH, SPACING, useCalendarRow} from '../useCalendarRow';
import {CalendarDayData} from '../../../../../types/diary';

interface CalendarRowItemProps {
  dayItem: CalendarDayData;
  index: number;
  scrollX: ReturnType<typeof useCalendarRow>['scrollX'];
}

const CalendarRowItem: React.FC<CalendarRowItemProps> = ({
  dayItem,
  index,
  scrollX,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [1, 1, 0.8],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
      zIndex: scale > 1 ? 1 : 0,
    };
  });

  useEffect(() => {
    console.log('CalendarRowItem mounted:', index, dayItem.dayTitle);
  }, [dayItem, index]);

  console.log('CalendarRowItem rendering:', index, dayItem.dayTitle);

  return (
    <Animated.View
      style={[{width: ITEM_WIDTH, marginRight: SPACING}, animatedStyle]}>
      <CalendarTile dayItem={dayItem} />
    </Animated.View>
  );
};

export default CalendarRowItem;
