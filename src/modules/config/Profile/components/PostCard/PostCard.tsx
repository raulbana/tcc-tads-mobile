import React from 'react';
import {Image, TouchableOpacity, Alert} from 'react-native';
import {Trash, Eye, Heart, ChatCircle} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {Content} from '../../../../../types/content';
import * as S from './styles';

export interface PostCardProps {
  post: Content;
  onDelete: (postId: string) => void;
  isDeleting: boolean;
}

const PostCard: React.FC<PostCardProps> = ({post, onDelete, isDeleting}) => {
  const theme = useDynamicTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    onDelete(post.id);
  };

  const hasMedia = post.media && post.media.length > 0;
  const firstMedia = hasMedia ? post.media[0] : null;

  return (
    <S.Container>
      <S.Header>
        <S.PostInfo>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text={post.title}
          />
          <Label
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
            text={formatDate(post.createdAt)}
          />
        </S.PostInfo>

        <TouchableOpacity
          onPress={handleDelete}
          disabled={isDeleting}
          style={S.deleteButtonStyle}>
          <Trash
            size={18}
            color={isDeleting ? theme.colors.gray_05 : theme.colors.error}
            weight="bold"
          />
        </TouchableOpacity>
      </S.Header>

      {post.description && (
        <S.ContentContainer>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_07}
            text={post.description}
            numberOfLines={3}
          />
        </S.ContentContainer>
      )}

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
              text={(post.likesCount ?? 0).toString()}
            />
          </S.StatItem>

          <S.StatItem>
            <ChatCircle size={16} color={theme.colors.gray_06} weight="bold" />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={(post.commentsCount ?? 0).toString()}
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

export default PostCard;
