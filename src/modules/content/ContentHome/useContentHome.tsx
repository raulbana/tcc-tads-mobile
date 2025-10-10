import {useCallback, useEffect, useState} from 'react';
import {BadgeProps} from '../../../components/Badge/Badge';
import {ContentCardProps} from '../../../components/ContentCard/ContentCard';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const badgeListMock: BadgeProps[] = [
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
  {
    content: 'Teste',
  },
];

const contentCardListMock: ContentCardProps[] = [
  {
    image: {uri: 'https://picsum.photos/200/300'},
    badgeLabel: 'Comunidade',
    title: 'Título do Conteúdo',
    description: 'Descrição do Conteúdo',
    onClick: () => {},
  },
  {
    image: {uri: 'https://picsum.photos/200/300'},
    badgeLabel: 'Comunidade',
    title: 'Título do Conteúdo',
    description: 'Descrição do Conteúdo',
    onClick: () => {},
  },
  {
    image: {uri: 'https://picsum.photos/200/300'},
    badgeLabel: 'Comunidade',
    title: 'Título do Conteúdo',
    description: 'Descrição do Conteúdo',
    onClick: () => {},
  },
];

const useContentHome = () => {
  const [badgeList] = useState<BadgeProps[]>(badgeListMock);
  const [contentCardList, setContentCardList] =
    useState<ContentCardProps[]>(contentCardListMock);

  const {navigate} = useNavigation<NavigationStackProp>();

  const navigateToDetails = () => {
    navigate('Content', {screen: 'ContentDetails', params: {contentId: '1'}});
  };

  const handleCardClick = (contentId: string) => {
    navigate('Content', {screen: 'ContentDetails', params: {contentId}});
  };

  const navigateToCreateContent = () => {
    navigate('Content', {screen: 'CreateContent'});
  }

  const setCardClickHandlers = useCallback(() => {
    const updatedContentCards = contentCardList.map((card, index) => ({
      ...card,
      onClick: () => handleCardClick((index + 1).toString()),
    }));
    setContentCardList(updatedContentCards);
  }, [contentCardList, handleCardClick]);

  useEffect(() => {
    setCardClickHandlers();
  }, [setCardClickHandlers]);

  return {
    badgeList,
    contentCardList,
    navigateToDetails,
    handleCardClick,
    navigateToCreateContent,
  };
};

export default useContentHome;
