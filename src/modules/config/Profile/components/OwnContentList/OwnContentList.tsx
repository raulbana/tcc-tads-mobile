import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Content} from '../../../../../types/content';
import OwnContentCard from '../OwnContentCard/OwnContentCard';
import EmptyState from '../EmptyState/EmptyState';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';

export interface OwnContentListProps {
  ownContent: Content[];
  isLoading: boolean;
  onRefresh: () => void;
  onEditContent: (content: Content) => void;
  onDeleteContent: (contentId: string) => void;
  onContentPress?: (content: Content) => void;
}

const OwnContentList: React.FC<OwnContentListProps> = ({
  ownContent,
  isLoading,
  onRefresh,
  onEditContent,
  onDeleteContent,
  onContentPress,
}) => {
  const theme = useDynamicTheme();

  const renderContent = ({item}: {item: Content}) => (
    <OwnContentCard
      content={item}
      onEdit={onEditContent}
      onDelete={onDeleteContent}
      onPress={onContentPress}
    />
  );

  const keyExtractor = (item: Content) => item.id;

  if (ownContent.length === 0) {
    return (
      <EmptyState
        title="Nenhum conteúdo criado"
        description="Você ainda não criou nenhum conteúdo. Que tal compartilhar algo interessante?"
        onRefresh={onRefresh}
        showCreateContentButton={true}
      />
    );
  }

  return (
    <S.Container>
      <Label
        typography={theme.typography.title.b3}
        color={theme.colors.gray_08}
        text="Meus Conteúdos"
      />
      <FlatList
        data={ownContent}
        renderItem={renderContent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        contentContainerStyle={S.listContentStyle}
      />
    </S.Container>
  );
};

export default OwnContentList;
