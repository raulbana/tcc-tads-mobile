import React from 'react';
import {Plus} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import * as S from '../../../../../modules/config/Profile/components/EmptyState/styles';
import { NavigationStackProp } from '../../../../../navigation/routes';
import { useNavigation } from '@react-navigation/native';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  onRefresh: () => void;
  showCreateContentButton?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nenhuma postagem ainda',
  description = 'Você ainda não fez nenhuma postagem. Que tal compartilhar algo interessante?',
  showCreateContentButton = false,
}) => {
  const theme = useDynamicTheme();

  const {navigate} = useNavigation<NavigationStackProp>();
  const handleCreateContent = () => {
    navigate('Content', {screen: 'CreateContent'});
  };
  return (
    <S.Container>
      <S.IconContainer>
        <Plus size={48} color={theme.colors.gray_05} weight="bold" />
      </S.IconContainer>

      <S.TextContainer>
        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_07}
          text={title}
        />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_06}
          text={description}
        />
      </S.TextContainer>

    {showCreateContentButton && (
      <S.ActionsContainer>
        <Button
          type="PRIMARY"
          size="MEDIUM"
          text={
            <Label
              typography={theme.typography.paragraph.sb2}
              text="Criar Primeira Postagem"
              color={theme.colors.white}
            />
          }
          onPress={handleCreateContent}
          icon={<Plus size={16} color={theme.colors.white} weight="bold" />}
          iconPosition="LEFT"
        />
      </S.ActionsContainer>
      )}
    </S.Container>
  );
};

export default EmptyState;
