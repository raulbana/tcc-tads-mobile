import React from 'react';
import {
  PencilSimple,
  Trash,
  Heart,
  ChatCircle,
  Eye,
} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {Content} from '../../../../../types/content';
import * as S from './styles';

export interface OwnContentCardProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onPress?: (content: Content) => void;
}

const OwnContentCard: React.FC<OwnContentCardProps> = ({
  content,
  onEdit,
  onDelete,
  onPress,
}) => {
  const theme = useDynamicTheme();

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';

    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return '';
    }

    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = () => {
    onEdit(content);
  };

  const handleDelete = () => {
    onDelete(content.id);
  };

  const hasImages = content.media && content.media.length > 0;
  const firstImage = hasImages ? content.media?.[0]?.url : null;

  const handlePress = () => {
    if (onPress) {
      onPress(content);
    }
  };

  return (
    <S.Container onPress={handlePress} disabled={!onPress}>
      <S.Header>
        <S.ContentInfo>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text={content.title}
          />
          <Label
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
            text={formatDate(content.createdAt)}
          />
        </S.ContentInfo>

        <S.ActionsContainer>
          <S.ActionButton onPress={handleEdit}>
            <PencilSimple
              size={18}
              color={theme.colors.purple_04}
              weight="bold"
            />
          </S.ActionButton>
          <S.ActionButton onPress={handleDelete}>
            <Trash size={18} color={theme.colors.error} weight="bold" />
          </S.ActionButton>
        </S.ActionsContainer>
      </S.Header>

      {content.description && (
        <S.ContentContainer>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_07}
            text={content.description}
            numberOfLines={3}
          />
        </S.ContentContainer>
      )}

      {hasImages && firstImage && (
        <S.MediaContainer>
          <S.MediaImage source={{uri: firstImage}} resizeMode="cover" />
        </S.MediaContainer>
      )}

      <S.Footer>
        <S.StatsContainer>
          <S.StatItem>
            <Heart size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={content.likesCount?.toString() || '0'}
            />
          </S.StatItem>

          <S.StatItem>
            <ChatCircle size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={content.commentsCount?.toString() || '0'}
            />
          </S.StatItem>

          <S.StatItem>
            <Eye size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={(content.repostsCount || 0).toString()}
            />
          </S.StatItem>
        </S.StatsContainer>
      </S.Footer>
    </S.Container>
  );
};

export default OwnContentCard;
