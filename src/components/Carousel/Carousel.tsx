import React, {useRef} from 'react';
import {FlatList, ViewToken} from 'react-native';
import * as S from './styles';

export interface CarouselProps<T> {
  data: T[];
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  itemWidth?: number;
  gap?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
}

function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  gap = 16,
  onIndexChange,
  initialIndex = 0,
}: CarouselProps<T>) {
  const flatListRef = useRef<FlatList<T>>(null);
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (onIndexChange && viewableItems.length > 0) {
        onIndexChange(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  return (
    <S.Container>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({item, index}) => (
          <S.ItemContainer style={{width: itemWidth, marginRight: gap}}>
            {renderItem({item, index})}
          </S.ItemContainer>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={(itemWidth ?? 0) + gap}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: gap}}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 60}}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => {
          const length = (itemWidth ?? 0) + gap;
          return {
            length,
            offset: length * index,
            index,
          };
        }}
      />
    </S.Container>
  );
}

export default Carousel;
