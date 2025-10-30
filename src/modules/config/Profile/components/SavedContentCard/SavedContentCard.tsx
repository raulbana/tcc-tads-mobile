import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  BookmarkSimple,
  Heart,
  ChatCircle,
  Eye,
  User,
} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {Content} from '../../../../../types/content';
import * as S from './styles';

export interface SavedContentCardProps {
  content: Content;
  onUnsave: (contentId: string) => void;
}

const SavedContentCard: React.FC<SavedContentCardProps> = ({
  content,
  onUnsave,
}) => {
  const theme = useDynamicTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleUnsave = () => {
    onUnsave(content.id);
  };

  const hasMedia = content.media && content.media.length > 0;
  const firstMedia = hasMedia ? content.media[0] : null;

  return (
    <S.Container>
      <S.Header>
        <S.AuthorInfo>
          <S.AuthorAvatar>
            <User size={20} color={theme.colors.gray_06} weight="bold" />
          </S.AuthorAvatar>
          <S.AuthorDetails>
            <Label
              typography={theme.typography.paragraph.sb2}
              color={theme.colors.gray_08}
              text={content.author?.name || 'Usuário'}
            />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={formatDate(content.createdAt)}
            />
          </S.AuthorDetails>
        </S.AuthorInfo>

        <TouchableOpacity onPress={handleUnsave} style={S.unsaveButtonStyle}>
          <BookmarkSimple
            size={18}
            color={theme.colors.purple_04}
            weight="fill"
          />
        </TouchableOpacity>
      </S.Header>

      <S.ContentContainer>
        <Label
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
          text={content.title}
        />
        {content.description && (
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_07}
            text={content.description}
            numberOfLines={3}
          />
        )}
      </S.ContentContainer>

      {hasMedia && firstMedia && (
        <S.MediaContainer>
          <Image
            source={{uri: firstMedia.url}}
            style={S.mediaImageStyle}
            resizeMode="cover"
          />
        </S.MediaContainer>
      )}

      <S.Footer>
        <S.StatsContainer>
          <S.StatItem>
            <Heart size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={(content.likesCount ?? 0).toString()}
            />
          </S.StatItem>

          <S.StatItem>
            <ChatCircle size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={(content.commentsCount ?? 0).toString()}
            />
          </S.StatItem>

          <S.StatItem>
            <Eye size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={'0'}
            />
          </S.StatItem>
        </S.StatsContainer>
      </S.Footer>
    </S.Container>
  );
};

export default SavedContentCard;
