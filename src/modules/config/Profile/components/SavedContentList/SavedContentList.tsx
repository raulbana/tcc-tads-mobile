import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Content} from '../../../../../types/content';
import SavedContentCard from '../SavedContentCard/SavedContentCard';
import EmptyState from '../EmptyState/EmptyState';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

export interface SavedContentListProps {
  savedContent: Content[];
  isLoading: boolean;
  onRefresh: () => void;
  onUnsaveContent: (contentId: string) => void;
}

const SavedContentList: React.FC<SavedContentListProps> = ({
  savedContent,
  isLoading,
  onRefresh,
  onUnsaveContent,
}) => {
  const renderContent = ({item}: {item: Content}) => (
    <SavedContentCard content={item} onUnsave={onUnsaveContent} />
  );

  const keyExtractor = (item: Content) => item.id;

  if (savedContent.length === 0) {
    return (
      <EmptyState
        title="Nenhum conteúdo salvo"
        description="Você ainda não salvou nenhum conteúdo. Explore e salve conteúdos interessantes!"
        onRefresh={onRefresh}
      />
    );
  }

  const theme = useDynamicTheme();

  return (
    <S.Container>
        <Label
          typography={theme.typography.title.h4}
          color={theme.colors.gray_08}
          text="Conteúdos Salvos"
        />
      <FlatList
        data={savedContent}
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

export default SavedContentList;
