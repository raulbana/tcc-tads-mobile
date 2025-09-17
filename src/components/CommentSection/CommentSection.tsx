import React, {useState} from 'react';
import {Comment as CommentType} from '../../types/content';
import Label from '../Label/Label';
import theme from '../../theme/theme';
import Comment from '../Comment/Comment';
import * as S from './styles';
import CommentInput from '../CommentInput/CommentInput';

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
  replyTo?: string | null;
  replyText?: string;
  setReplyText?: (text: string) => void;
  setReplyTo?: (id: string | null) => void;
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
  replyTo,
  replyText,
  setReplyText,
  setReplyTo,
}) => {
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
            onPressReply={id => setReplyTo && setReplyTo(id)}
            key={comment.id}
            comment={comment}
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
