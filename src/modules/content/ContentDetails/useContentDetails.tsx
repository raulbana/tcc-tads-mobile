import {useRoute} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {ContentParamList} from '../../../navigation/routes';
import {RouteProp} from '@react-navigation/native';
import {useAuth} from '../../../contexts/AuthContext';
import {Comment} from '../../../types/content';
import useContentQueries from '../services/contentQueryFactory';

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
    return root;
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

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [imageCarouselVisible, setImageCarouselVisible] = useState(false);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);

  useEffect(() => {
    if (content) {
      setComments(content.comments || []);
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
        userId: user.id.toString(),
        control: !content.isSaved,
      });
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  }, [content, user, toggleSaveMutation]);

  const handleSendComment = useCallback(async () => {
    if (!content || !commentText.trim() || !user) return;

    if (replyTo) {
      if (replyText.trim() === '') return;
      const rootId = findRootCommentId(comments, replyTo) ?? replyTo;

      const newReply: Comment = {
        id: Math.random().toString(36).substring(7),
        contentId: contentId,
        authorId: user.id.toString(),
        authorName: user.name,
        text: replyText,
        likesCount: 0,
        isLikedByCurrentUser: false,
        repliesCount: 0,
        replies: [],
        authorImage:
          user.profilePictureUrl || 'https://i.pravatar.cc/150?img=3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setComments(prev => addReplyUnderRoot(prev, rootId, newReply));
      setReplyTo(null);
      setReplyText('');
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        contentId: parseInt(contentId),
        authorId: user.id,
        text: commentText,
      });
      setCommentText('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  }, [
    content,
    commentText,
    replyTo,
    replyText,
    comments,
    contentId,
    user,
    createCommentMutation,
  ]);

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

  const handleReplyToComment = useCallback((commentId: string) => {
    setReplyTo(commentId);
  }, []);

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
      createCommentMutation.isPending,
    error:
      error?.message ||
      toggleLikeMutation.error?.message ||
      toggleRepostMutation.error?.message ||
      toggleSaveMutation.error?.message ||
      createCommentMutation.error?.message,
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
    setImageCarouselIndex,
  };
};

export default useContentDetails;
