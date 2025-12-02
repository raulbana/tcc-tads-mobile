import React, {useEffect, useState} from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import {ChatCircle, DotsThree} from 'phosphor-react-native';
import moment from 'moment';
import {Comment as CommentType} from '../../types/content';
import LikeButton from '../LikeButton/LikeButton';
import useComment from './useComment';
import {verticalScale} from '../../utils/scales';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export interface CommentProps {
  comment: CommentType;
  onPressLike?: (id: string, liked: boolean) => void;
  onPressReply?: (id: string) => void;
  onPressMore?: (id: string) => void;
  onLoadReplies?: (id: string) => void;
  isReply?: boolean;
  depthLevel?: number;
  currentUserId?: string | null;
  contentOwnerId?: string | null;
  onRequestDelete?: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onPressLike,
  onPressReply,
  onPressMore,
  onLoadReplies,
  isReply = false,
  depthLevel = 0,
  currentUserId,
  contentOwnerId,
  onRequestDelete,
}) => {
  const theme = useDynamicTheme();

  const {
    id,
    author,
    text,
    createdAt,
    likesCount = 0,
    isLikedByCurrentUser = false,
    repliesCount = 0,
    replies = [],
  } = comment;

  const {toggleReplies, repliesVisible} = useComment();
  const [menuVisible, setMenuVisible] = useState(false);

  const normalizedCurrentUserId = currentUserId ? currentUserId.toString() : '';
  const normalizedContentOwnerId = contentOwnerId
    ? contentOwnerId.toString()
    : '';
  const authorId = comment.author?.id?.toString() || '';
  const canManage =
    !!normalizedCurrentUserId &&
    !!authorId &&
    (normalizedCurrentUserId === authorId ||
      normalizedCurrentUserId === normalizedContentOwnerId);

  useEffect(() => {
    if (!canManage && menuVisible) {
      setMenuVisible(false);
    }
  }, [canManage]);

  const handleLike = () => onPressLike?.(id, !isLikedByCurrentUser);
  const handleReply = () => onPressReply?.(id);
  const handleMore = () => {
    if (!canManage) return;
    setMenuVisible(prev => !prev);
    onPressMore?.(id);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    onRequestDelete?.(id);
  };

  const handleToggleReplies = () => {
    if (
      !repliesVisible &&
      repliesCount > 0 &&
      (!replies || replies.length === 0) &&
      onLoadReplies
    ) {
      onLoadReplies(id);
    }
    toggleReplies();
  };

  return (
    <S.Container>
      {author?.profilePicture ? (
        <S.Avatar source={{uri: author.profilePicture}} />
      ) : (
        <S.AvatarPlaceholder>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_06}
            text={author?.name?.charAt(0)?.toUpperCase() || 'U'}
          />
        </S.AvatarPlaceholder>
      )}
      <S.Content>
        <S.HeaderRow>
          <Label
            typography={
              isReply
                ? theme.typography.paragraph.sb2
                : theme.typography.paragraph.sb3
            }
            color={theme.colors.gray_08}
            text={author?.name || 'Usuário'}
          />
          <Label
            typography={theme.typography.paragraph.sm1}
            color={theme.colors.gray_06}
            text={moment.utc(createdAt).local().fromNow()}
          />
          {canManage && (
            <S.MenuWrapper>
              {menuVisible && (
                <S.Tooltip placement="above">
                  <S.TooltipButton onPress={handleDelete}>
                    <Label
                      typography={theme.typography.paragraph.sm2}
                      color={theme.colors.error}
                      text="Excluir comentário"
                    />
                  </S.TooltipButton>
                </S.Tooltip>
              )}
              <S.IconButton
                onPress={handleMore}
                hitSlop={{top: 6, bottom: 6, left: 6, right: 6}}>
                <DotsThree
                  size={18}
                  color={theme.colors.gray_06}
                  weight="bold"
                />
              </S.IconButton>
            </S.MenuWrapper>
          )}
        </S.HeaderRow>

        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
          text={text}
        />

        <S.ActionsRow>
          <S.ButtonRow>
            <LikeButton
              size={20}
              isLiked={isLikedByCurrentUser}
              onPress={handleLike}
            />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={
                isLikedByCurrentUser
                  ? theme.colors.purple_03
                  : theme.colors.gray_06
              }
              text={likesCount.toString()}
            />
          </S.ButtonRow>
          <S.ActionButton onPress={handleReply} activeOpacity={0.7}>
            <ChatCircle size={18} color={theme.colors.gray_06} />
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
              text={repliesCount > 0 ? `${repliesCount}` : 'Responder'}
            />
          </S.ActionButton>
        </S.ActionsRow>
        {!repliesVisible && repliesCount > 0 && (
          <S.ReplyToggleContainer>
            <S.ReplyToggleButton
              onPress={handleToggleReplies}
              activeOpacity={0.7}>
              <Label
                typography={theme.typography.paragraph.sm2}
                color={theme.colors.gray_06}
                text={'Ver respostas (' + repliesCount + ')'}
              />
            </S.ReplyToggleButton>
          </S.ReplyToggleContainer>
        )}
        {repliesVisible && replies && replies.length > 0 && (
          <S.RepliesContainer isSecondLevel={depthLevel >= 1}>
            <>
              {replies.map(reply => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onPressLike={() => {
                    onPressLike?.(reply.id, !reply.isLikedByCurrentUser);
                  }}
                  onPressReply={onPressReply}
                  onPressMore={onPressMore}
                  onLoadReplies={onLoadReplies}
                  isReply={depthLevel < 1}
                  depthLevel={depthLevel + 1}
                  currentUserId={currentUserId}
                  contentOwnerId={contentOwnerId}
                  onRequestDelete={onRequestDelete}
                />
              ))}
            </>
          </S.RepliesContainer>
        )}
        {repliesVisible && repliesCount > 0 && (
          <S.ReplyToggleContainer
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: verticalScale(8),
            }}>
            <S.ReplyToggleButton
              onPress={handleToggleReplies}
              activeOpacity={0.7}>
              <Label
                typography={theme.typography.paragraph.sb2}
                color={theme.colors.gray_06}
                text={'Ocultar respostas'}
              />
            </S.ReplyToggleButton>
          </S.ReplyToggleContainer>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Comment;
