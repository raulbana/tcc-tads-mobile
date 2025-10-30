import React, {useRef} from 'react';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import UploadContentForm from './components/UploadContentForm/UploadContentForm';
import ContentSelector from './components/ContentSelector/ContentSelector';
import * as S from './styles';
import useEditContent from './useEditContent';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';

const EditContent: React.FC = () => {
  const scrollRef = useRef<any>(null);
  const {
    goBack,
    content,
    contentsList,
    isLoading,
    error,
    handleSelectContent,
    hasContentId,
  } = useEditContent();
  const theme = useDynamicTheme();

  if (!hasContentId && !content) {
    return (
      <ScreenContainer
        scrollable={true}
        ref={scrollRef}
        goBackTo="Perfil"
        goBack={goBack}
        headerShown>
        <S.Wrapper>
          <S.Header>
            <Label
              typography={theme.typography.title.b3}
              text="Selecionar Conteúdo"
              color={theme.colors.gray_08}
            />
          </S.Header>
          <ContentSelector
            contents={contentsList}
            onSelectContent={handleSelectContent}
            isLoading={isLoading}
          />
        </S.Wrapper>
      </ScreenContainer>
    );
  }

  if (isLoading && hasContentId) {
    return (
      <ScreenContainer
        scrollable={true}
        ref={scrollRef}
        goBackTo="Perfil"
        goBack={goBack}
        headerShown>
        <S.Wrapper>
          <S.Header>
            <Label
              typography={theme.typography.title.b3}
              text="Carregando..."
              color={theme.colors.gray_08}
            />
          </S.Header>
        </S.Wrapper>
      </ScreenContainer>
    );
  }

  if (error && hasContentId) {
    return (
      <ScreenContainer
        scrollable={true}
        ref={scrollRef}
        goBackTo="Perfil"
        goBack={goBack}
        headerShown>
        <S.Wrapper>
          <S.Header>
            <Label
              typography={theme.typography.title.b3}
              text="Erro"
              color={theme.colors.error}
            />
          </S.Header>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.error}
            text={error.message || 'Erro ao carregar conteúdo'}
          />
        </S.Wrapper>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      scrollable={true}
      ref={scrollRef}
      goBackTo="Perfil"
      goBack={goBack}
      headerShown>
      <S.Wrapper>
        <S.Header>
          <Label
            typography={theme.typography.title.b3}
            text="Editar Post"
            color={theme.colors.gray_08}
          />
        </S.Header>
        {content && (
          <UploadContentForm
            parentScrollRef={scrollRef}
            initialContent={content}
          />
        )}
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default EditContent;
