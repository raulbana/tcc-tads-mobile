import {useRoute} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {ContentParamList} from '../../../navigation/routes';
import {RouteProp} from '@react-navigation/native';
import {useAuth} from '../../../contexts/AuthContext';
import {Comment} from '../../../types/content';
import useContentQueries from '../services/contentQueryFactory';
import contentServices from '../services/contentServices';

function updateCommentById(
  comments: Comment[],
  commentId: string,
  updater: (c: Comment) => Comment,
): Comment[] {
  return comments.map(comment => {
    if (comment.id === commentId) {
      return updater(comment);
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentById(comment.replies, commentId, updater),
      };
    }
    return comment;
  });
}

function findRootCommentId(
  comments: Comment[],
  targetId: string,
): string | null {
  for (const root of comments) {
    if (root.id === targetId) return root.id;
    if (root.replies?.some(r => r.id === targetId)) return root.id;
    if (root.replies && root.replies.length) {
      const nested = findRootCommentId(root.replies, targetId);
      if (nested) return root.id;
    }
  }
  return null;
}

function addReplyUnderRoot(
  comments: Comment[],
  rootId: string,
  newReply: Comment,
): Comment[] {
  return comments.map(root => {
    if (root.id === rootId) {
      return {
        ...root,
        replies: [...(root.replies || []), newReply],
        repliesCount: (root.repliesCount || 0) + 1,
      };
    }
    if (root.replies && root.replies.length > 0) {
      return {
        ...root,
        replies: addReplyUnderRoot(root.replies, rootId, newReply),
      };
    }
    return root;
  });
}

function organizeCommentsHierarchy(comments: Comment[]): Comment[] {
  if (!comments || comments.length === 0) {
    return [];
  }

  const replyIds = new Set<string>();

  const collectAllReplyIds = (commentList: Comment[]) => {
    commentList.forEach(comment => {
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          replyIds.add(reply.id);
          if (reply.replies && reply.replies.length > 0) {
            collectAllReplyIds([reply]);
          }
        });
      }
    });
  };

  collectAllReplyIds(comments);

  const rootComments = comments.filter(comment => !replyIds.has(comment.id));

  const organizeAndLimitDepth = (
    commentList: Comment[],
    depth: number = 0,
  ): Comment[] => {
    return commentList.map(comment => {
      if (depth >= 2) {
        return {
          ...comment,
          replies: [],
        };
      }

      let organizedReplies: Comment[] = [];
      if (comment.replies && comment.replies.length > 0) {
        organizedReplies = organizeAndLimitDepth(comment.replies, depth + 1);
      }

      return {
        ...comment,
        replies: organizedReplies,
      };
    });
  };

  return organizeAndLimitDepth(rootComments);
}

function removeCommentById(comments: Comment[], commentId: string): Comment[] {
  return comments
    .filter(comment => comment.id !== commentId)
    .map(comment => {
      if (comment.replies && comment.replies.length > 0) {
        const updatedReplies = removeCommentById(comment.replies, commentId);
        return {
          ...comment,
          replies: updatedReplies,
          repliesCount: updatedReplies.length,
        };
      }
      return comment;
    });
}

const useContentDetails = () => {
  const {params} = useRoute<RouteProp<ContentParamList, 'ContentDetails'>>();
  const {contentId} = params;
  const {user} = useAuth();

  const contentQueries = useContentQueries(['content']);
  const {
    data: content,
    isLoading,
    error,
    refetch: refetchContent,
  } = contentQueries.getById(contentId, user?.id.toString() || '');

  const toggleLikeMutation = contentQueries.toggleLike();
  const toggleRepostMutation = contentQueries.toggleRepost();
  const toggleSaveMutation = contentQueries.toggleSaveContent();
  const createCommentMutation = contentQueries.createComment();
  const reportContentMutation = contentQueries.reportContent();
  const deleteCommentMutation = contentQueries.deleteComment();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [imageCarouselVisible, setImageCarouselVisible] = useState(false);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportContentId, setReportContentId] = useState<string | null>(null);
  const [deleteCommentModalVisible, setDeleteCommentModalVisible] =
    useState(false);
  const [commentPendingDeletion, setCommentPendingDeletion] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (content) {
      const organizedComments = organizeCommentsHierarchy(
        content.comments || [],
      );
      setComments(organizedComments);
    }
  }, [content]);

  const handleToggleLike = useCallback(async () => {
    if (!content || !user) return;
    try {
      await toggleLikeMutation.mutateAsync({
        id: content.id,
        liked: !content.isLiked,
        userId: user.id.toString(),
      });
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }, [content, user, toggleLikeMutation]);

  const handleToggleRepost = useCallback(async () => {
    if (!content || !user) return;
    try {
      await toggleRepostMutation.mutateAsync({
        id: content.id,
        reposted: !content.isReposted,
        userId: user.id.toString(),
      });
    } catch (err) {
      console.error('Error toggling repost:', err);
    }
  }, [content, user, toggleRepostMutation]);

  const handleToggleSave = useCallback(async () => {
    if (!content || !user) return;
    try {
      await toggleSaveMutation.mutateAsync({
        contentId: content.id,
        userId: user.id,
        control: !content.isSaved,
      });
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  }, [content, user, toggleSaveMutation]);

  const handleLoadReplies = useCallback(async (commentId: string) => {
    try {
      const replies = await contentServices.getCommentReplies(commentId);
      const limitDepth = (
        commentList: Comment[],
        depth: number = 0,
      ): Comment[] => {
        if (depth >= 2) {
          return commentList.map(comment => ({
            ...comment,
            replies: [],
          }));
        }
        return commentList.map(comment => ({
          ...comment,
          replies: comment.replies
            ? limitDepth(comment.replies, depth + 1)
            : [],
        }));
      };
      const limitedReplies = limitDepth(replies, 1);
      setComments(prev =>
        updateCommentById(prev, commentId, comment => ({
          ...comment,
          replies: limitedReplies,
        })),
      );
    } catch (err) {
      console.error('Error loading replies:', err);
    }
  }, []);

  const handleSendComment = useCallback(
    async (text?: string, parentId?: string) => {
      if (!content || !user) return;

      const finalText = text !== undefined ? text : commentText;
      const finalParentId = parentId !== undefined ? parentId : replyTo;
      const resolvedParentId = finalParentId
        ? findRootCommentId(comments, finalParentId) ?? finalParentId
        : undefined;

      if (!finalText.trim()) return;

      try {
        if (resolvedParentId) {
          const parentComment =
            comments.find(c => c.id === resolvedParentId) ||
            comments.find(c => c.replies?.some(r => r.id === resolvedParentId));

          if (
            parentComment &&
            (!parentComment.replies || parentComment.replies.length === 0)
          ) {
            await handleLoadReplies(resolvedParentId);
          }
        }

        await createCommentMutation.mutateAsync({
          contentId: parseInt(contentId),
          authorId: user.id,
          text: finalText,
          replyToCommentId: resolvedParentId
            ? parseInt(resolvedParentId)
            : undefined,
        });

        if (finalParentId) {
          setReplyText('');
          setReplyTo(null);
        } else {
          setCommentText('');
        }

        // Refetch para garantir que todas as respostas sejam atualizadas
        const updatedContent = await refetchContent({cancelRefetch: false});

        // Se há um parentId, garantir que todas as respostas sejam carregadas após o refetch
        if (resolvedParentId && updatedContent.data) {
          const organizedComments = organizeCommentsHierarchy(
            updatedContent.data.comments || [],
          );
          setComments(organizedComments);
        }
      } catch (err) {
        console.error('Error adding comment:', err);
      }
    },
    [
      content,
      commentText,
      replyTo,
      replyText,
      comments,
      contentId,
      user,
      createCommentMutation,
      refetchContent,
      handleLoadReplies,
    ],
  );

  const handleLikeComment = useCallback((commentId: string) => {
    setComments(prev =>
      updateCommentById(prev, commentId, comment => ({
        ...comment,
        isLikedByCurrentUser: !comment.isLikedByCurrentUser,
        likesCount: comment.isLikedByCurrentUser
          ? (comment.likesCount || 0) - 1
          : (comment.likesCount || 0) + 1,
      })),
    );
  }, []);

  const handleReplyToComment = useCallback(
    (commentId: string) => {
      const rootId = findRootCommentId(comments, commentId) ?? commentId;
      setReplyTo(rootId);
    },
    [comments],
  );

  const handleCancelReply = useCallback(() => {
    setReplyTo(null);
    setReplyText('');
  }, []);

  const handleImagePress = useCallback((index: number) => {
    setImageCarouselIndex(index);
    setImageCarouselVisible(true);
  }, []);

  const handleCloseImageCarousel = useCallback(() => {
    setImageCarouselVisible(false);
  }, []);

  const handleRefresh = useCallback(() => {
    refetchContent();
  }, [refetchContent]);

  const handleOpenReportModal = useCallback((contentId: string) => {
    setReportContentId(contentId);
    setReportModalVisible(true);
  }, []);

  const handleCloseReportModal = useCallback(() => {
    setReportModalVisible(false);
    setReportContentId(null);
  }, []);

  const handleReportContent = useCallback(
    async (reason: string) => {
      if (!reportContentId || !user) return;
      try {
        await reportContentMutation.mutateAsync({
          contentId: reportContentId,
          reason,
          userId: user.id.toString(),
        });
        handleCloseReportModal();
      } catch (err) {
        console.error('Error reporting content:', err);
        handleCloseReportModal();
        throw err;
      }
    },
    [reportContentId, user, reportContentMutation, handleCloseReportModal],
  );

  const handleOpenDeleteCommentModal = useCallback((commentId: string) => {
    setCommentPendingDeletion(commentId);
    setDeleteCommentModalVisible(true);
  }, []);

  const handleCloseDeleteCommentModal = useCallback(() => {
    setDeleteCommentModalVisible(false);
    setCommentPendingDeletion(null);
  }, []);

  const handleConfirmDeleteComment = useCallback(async () => {
    if (!commentPendingDeletion) return;
    try {
      await deleteCommentMutation.mutateAsync(commentPendingDeletion);
      // Remover comentário da lista local imediatamente
      setComments(prev => removeCommentById(prev, commentPendingDeletion));
      // Refetch para garantir sincronização com o servidor
      await refetchContent({cancelRefetch: false});
    } catch (err) {
      console.error('Error deleting comment:', err);
      // Em caso de erro, refetch para restaurar o estado correto
      await refetchContent({cancelRefetch: false});
    } finally {
      handleCloseDeleteCommentModal();
    }
  }, [
    commentPendingDeletion,
    deleteCommentMutation,
    handleCloseDeleteCommentModal,
    refetchContent,
  ]);

  const currentUserId = user?.id ? user.id.toString() : null;
  const authorId = content?.author?.id ? content.author.id.toString() : null;

  return {
    content,
    comments,
    commentText,
    setCommentText,
    replyTo,
    replyText,
    setReplyText,
    setReplyTo,
    imageCarouselVisible,
    imageCarouselIndex,
    isLoading:
      isLoading ||
      toggleLikeMutation.isPending ||
      toggleRepostMutation.isPending ||
      toggleSaveMutation.isPending ||
      createCommentMutation.isPending ||
      reportContentMutation.isPending ||
      deleteCommentMutation.isPending,
    error:
      error?.message ||
      toggleLikeMutation.error?.message ||
      toggleRepostMutation.error?.message ||
      toggleSaveMutation.error?.message ||
      createCommentMutation.error?.message ||
      deleteCommentMutation.error?.message,
    handleToggleLike,
    handleToggleRepost,
    handleToggleSave,
    handleSendComment,
    handleLikeComment,
    handleReplyToComment,
    handleCancelReply,
    handleImagePress,
    handleCloseImageCarousel,
    handleRefresh,
    handleLoadReplies,
    handleOpenReportModal,
    handleCloseReportModal,
    handleReportContent,
    reportModalVisible,
    reportContentId,
    isReporting: reportContentMutation.isPending,
    setImageCarouselIndex,
    currentUserId,
    handleOpenDeleteCommentModal,
    handleCloseDeleteCommentModal,
    handleConfirmDeleteComment,
    isDeleteCommentModalVisible: deleteCommentModalVisible,
    isDeletingComment: deleteCommentMutation.isPending,
    authorId,
  };
};

export default useContentDetails;
