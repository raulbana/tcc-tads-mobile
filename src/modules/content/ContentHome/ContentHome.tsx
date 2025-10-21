import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import * as S from './styles';
import Label from '../../../components/Label/Label';
import Badge from '../../../components/Badge/Badge';
import CarouselSection from '../../../components/CarouselSection.tsx/CarouselSection';
import ContentCard from '../../../components/ContentCard/ContentCard';
import useContentHome from './useContentHome';
import Icon from '../../../components/Icon/Icon';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

const ContentHome = () => {
  const {badgeList, contentCardList, navigateToCreateContent} = useContentHome();

  const theme = useDynamicTheme();

  return (
    <ScreenContainer scrollable>
      <S.Wrapper>
        <S.Header>
          <Label
            typography={theme.typography.title.b3}
            color={theme.colors.gray_08}
            text="Conteúdos"
          />
          <S.CreatePostButton onPress={navigateToCreateContent}>
            <Icon name="Plus" size={24} color={theme.colors.gray_08} />
          </S.CreatePostButton>
        </S.Header>
        <CarouselSection
          carouselData={{
            data: badgeList,
            itemWidth: 64,
            renderItem: ({item}) => <Badge {...item} />,
          }}
          sectionTitle="Categorias"
        />
        <CarouselSection
          carouselData={{
            data: contentCardList,
            itemWidth: 224,
            renderItem: ({item}) => <ContentCard {...item} />,
          }}
          sectionTitle="Conteúdo X"
        />
        <CarouselSection
          carouselData={{
            data: contentCardList,
            itemWidth: 224,
            renderItem: ({item}) => <ContentCard {...item} />,
          }}
          sectionTitle="Conteúdo Y"
        />
        <CarouselSection
          carouselData={{
            data: contentCardList,
            itemWidth: 224,
            renderItem: ({item}) => <ContentCard {...item} />,
          }}
          sectionTitle="Conteúdo Z"
        />
        <CarouselSection
          carouselData={{
            data: contentCardList,
            itemWidth: 224,
            renderItem: ({item}) => <ContentCard {...item} />,
          }}
          sectionTitle="Conteúdo Z1"
        />
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default ContentHome;
