import React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {Comment as CommentType} from '../../types/content';
import Label from '../Label/Label';
import Comment from '../Comment/Comment';
import * as S from './styles';
import CommentInput from '../CommentInput/CommentInput';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export interface CommentSectionProps {
  comments: CommentType[];
  onCommentSend: (text: string, parentId?: string) => void;
  loading?: boolean;
  disabled?: boolean;
  commentText?: string;
  onCommentTextChange: (text: string) => void;
  onPressLike?: (commentId: string, liked: boolean) => void;
  onPressMore?: (commentId: string) => void;
  onPressReply?: (commentId: string) => void;
  onLoadReplies?: (commentId: string) => void;
  replyTo?: string | null;
  replyText?: string;
  setReplyText?: (text: string) => void;
  setReplyTo?: (id: string | null) => void;
  currentUserId?: string | null;
  contentOwnerId?: string | null;
  onRequestDelete?: (commentId: string) => void;
  commentInputRef?: React.RefObject<RNTextInput>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onCommentSend,
  loading,
  disabled,
  commentText,
  onCommentTextChange,
  onPressLike,
  onPressMore,
  onPressReply,
  onLoadReplies,
  replyTo,
  replyText,
  setReplyText,
  setReplyTo,
  currentUserId,
  contentOwnerId,
  onRequestDelete,
  commentInputRef,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.HeaderRow>
        <Label
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
          text={`Comentários`}
        />
      </S.HeaderRow>
      {!replyTo && (
        <CommentInput
          ref={commentInputRef}
          value={commentText || ''}
          onChange={onCommentTextChange}
          onSend={() => onCommentSend(commentText || '')}
          disabled={disabled}
          loading={loading}
        />
      )}
      {replyTo && (
        <S.ReplyInputWrapper>
          <Label
            text="Respondendo..."
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.purple_03}
          />
          <CommentInput
            ref={commentInputRef}
            value={replyText || ''}
            onChange={setReplyText ?? (() => {})}
            onSend={() => onCommentSend(replyText || '', replyTo)}
            disabled={disabled}
            loading={loading}
          />
          <S.CancelReplyButton onPress={() => setReplyTo && setReplyTo(null)}>
            <Label
              text="Cancelar"
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.gray_06}
            />
          </S.CancelReplyButton>
        </S.ReplyInputWrapper>
      )}
      {comments.length > 0 ? (
        comments.map(comment => (
          <Comment
            onPressLike={onPressLike}
            onPressMore={onPressMore}
            onPressReply={onPressReply || (id => setReplyTo && setReplyTo(id))}
            onLoadReplies={onLoadReplies}
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
            contentOwnerId={contentOwnerId}
            onRequestDelete={onRequestDelete}
          />
        ))
      ) : (
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_08}
          text={'Nenhum comentário'}
        />
      )}
    </S.Container>
  );
};

export default CommentSection;
