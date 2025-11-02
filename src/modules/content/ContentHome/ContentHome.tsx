import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import * as S from './styles';
import Label from '../../../components/Label/Label';
import Badge from '../../../components/Badge/Badge';
import CarouselSection from '../../../components/CarouselSection.tsx/CarouselSection';
import ContentCard from '../../../components/ContentCard/ContentCard';
import useContentHome from './useContentHome';
import Icon from '../../../components/Icon/Icon';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import {useAuth} from '../../../contexts/AuthContext';
import RestrictedAccess from '../RestrictedAccess/RestrictedAccess';

const ContentHome = () => {
  const {isLoggedIn} = useAuth();
  const {badgeList, contentCardList, navigateToCreateContent} =
    useContentHome();

  const theme = useDynamicTheme();

  if (!isLoggedIn) {
    return <RestrictedAccess />;
  }

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
