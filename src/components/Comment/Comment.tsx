import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import {ChatCircle, DotsThree} from 'phosphor-react-native';
import moment from 'moment';
import {Comment as CommentType} from '../../types/content';
import LikeButton from '../LikeButton/LikeButton';
import useComment from './useComment';
import {verticalScale} from '../../utils/scales';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface CommentProps {
  comment: CommentType;
  onPressLike?: (id: string, liked: boolean) => void;
  onPressReply?: (id: string) => void;
  onPressMore?: (id: string) => void;
  isReply?: boolean;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onPressLike,
  onPressReply,
  onPressMore,
  isReply = false,
}) => {
  const theme = useDynamicTheme();

  const {
    id,
    authorName,
    authorImage,
    text,
    createdAt,
    likesCount = 0,
    isLikedByCurrentUser = false,
    repliesCount = 0,
    replies = [],
  } = comment;

  const {toggleReplies, repliesVisible} = useComment();

  const handleLike = () => onPressLike?.(id, !isLikedByCurrentUser);
  const handleReply = () => onPressReply?.(id);
  const handleMore = () => onPressMore?.(id);

  return (
    <S.Container>
      <S.Avatar source={{uri: authorImage}} />
      <S.Content>
        <S.HeaderRow>
          <Label
            typography={
              isReply
                ? theme.typography.paragraph.sb2
                : theme.typography.paragraph.sb3
            }
            color={theme.colors.gray_08}
            text={authorName}
          />
          <Label
            typography={theme.typography.paragraph.sm1}
            color={theme.colors.gray_06}
            text={moment(createdAt).fromNow()}
          />
          <S.IconButton
            onPress={handleMore}
            hitSlop={{top: 6, bottom: 6, left: 6, right: 6}}>
            <DotsThree size={18} color={theme.colors.gray_06} weight="bold" />
          </S.IconButton>
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
            <S.ReplyToggleButton onPress={toggleReplies} activeOpacity={0.7}>
              <Label
                typography={theme.typography.paragraph.sm2}
                color={theme.colors.gray_06}
                text={'Ver respostas (' + repliesCount + ')'}
              />
            </S.ReplyToggleButton>
          </S.ReplyToggleContainer>
        )}
        {repliesVisible && replies && replies.length > 0 && (
          <S.RepliesContainer>
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
                  isReply
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
            <S.ReplyToggleButton onPress={toggleReplies} activeOpacity={0.7}>
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
