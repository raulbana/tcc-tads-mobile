import React from 'react';
import {Comment as CommentType} from '../../types/content';
import Label from '../Label/Label';
import theme from '../../theme/theme';
import Comment from '../Comment/Comment';
import * as S from './styles';
import CommentInput from '../CommentInput/CommentInput';

export interface CommentSectionProps {
  comments: CommentType[];
  onCommentSend: () => void;
  loading?: boolean;
  disabled?: boolean;
  commentText?: string;
  onCommentTextChange: (text: string) => void;
  onPressLike?: (commentId: string, liked: boolean) => void;
  onPressMore?: (commentId: string) => void;
  onPressReply?: (commentId: string) => void;
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
      <CommentInput
        value={commentText || ''}
        onChange={onCommentTextChange}
        onSend={onCommentSend}
      />
      {comments.length > 0 ? (
        comments.map(comment => (
          <Comment
            onPressLike={onPressLike}
            onPressMore={onPressMore}
            onPressReply={onPressReply}
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
