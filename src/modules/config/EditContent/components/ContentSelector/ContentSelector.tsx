import React, {useCallback} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {Content} from '../../../../../types/content';
import * as S from './styles';

export interface ContentSelectorProps {
  contents: Content[];
  onSelectContent: (content: Content) => void;
  isLoading?: boolean;
}

const ContentSelector: React.FC<ContentSelectorProps> = ({
  contents,
  onSelectContent,
  isLoading = false,
}) => {
  const theme = useDynamicTheme();

  const renderContent = useCallback(
    ({item}: {item: Content}) => (
      <TouchableOpacity
        onPress={() => onSelectContent(item)}
        style={S.cardStyle}>
        <S.CardContainer>
          {item.cover?.url && (
            <S.Thumbnail source={{uri: item.cover.url}} resizeMode="cover" />
          )}
          <S.InfoContainer>
            <Label
              typography={theme.typography.paragraph.sb2}
              color={theme.colors.gray_08}
              text={item.title}
              numberOfLines={2}
            />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={item.description || 'Sem descrição'}
              numberOfLines={2}
            />
            {item.categories && item.categories.length > 0 && (
              <S.CategoryBadge>
                <Label
                  typography={theme.typography.paragraph.sm2}
                  color={theme.colors.purple_04}
                  text={item.categories[0]}
                />
              </S.CategoryBadge>
            )}
          </S.InfoContainer>
        </S.CardContainer>
      </TouchableOpacity>
    ),
    [onSelectContent, theme],
  );

  const keyExtractor = useCallback((item: Content) => item.id, []);

  if (isLoading) {
    return (
      <S.Container>
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_06}
          text="Carregando conteúdos..."
        />
      </S.Container>
    );
  }

  if (contents.length === 0) {
    return (
      <S.Container>
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_06}
          text="Nenhum conteúdo encontrado"
        />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Label
        typography={theme.typography.title.b3}
        color={theme.colors.gray_08}
        text="Selecione um conteúdo para editar"
      />
      <FlatList
        data={contents}
        renderItem={renderContent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={S.listContentStyle}
      />
    </S.Container>
  );
};

export default ContentSelector;
