import {useRoute} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {ContentParamList} from '../../../navigation/routes';
import {RouteProp} from '@react-navigation/native';
import {useContent} from '../../../contexts/ContentContext';
import {Comment} from '../../../types/content';

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
        replies: [newReply, ...(root.replies || [])],
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

const useContentDetails = () => {
  const {params} = useRoute<RouteProp<ContentParamList, 'ContentDetails'>>();
  const {contentId} = params;

  const {
    loadContentById,
    toggleLikeContent,
    toggleRepostContent,
    addComment,
    isLoading,
    error,
    contents,
  } = useContent();

  const [content, setContent] = useState(
    () => contents.find(c => c.id === contentId) || null,
  );
  const [comments, setComments] = useState(content?.comments || []);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [imageCarouselVisible, setImageCarouselVisible] = useState(false);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentData = await loadContentById(contentId);
        console.log('contentData', contentData);
        if (contentData) {
          setContent(contentData);
          setComments(contentData.comments || []);
        }
      } catch (err) {
        console.error('Error loading content:', err);
      }
    };

    if (!content) {
      fetchContent();
    }
  }, [contentId, loadContentById, content]);

  useEffect(() => {
    const updatedContent = contents.find(c => c.id === contentId);
    if (updatedContent) {
      setContent(updatedContent);
      setComments(updatedContent.comments || []);
    }
  }, [contents, contentId]);

  const handleToggleLike = useCallback(async () => {
    if (!content) return;
    try {
      await toggleLikeContent(content.id);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }, [content, toggleLikeContent]);

  const handleToggleRepost = useCallback(async () => {
    if (!content) return;
    try {
      await toggleRepostContent(content.id);
    } catch (err) {
      console.error('Error toggling repost:', err);
    }
  }, [content, toggleRepostContent]);

  const handleSendComment = useCallback(async () => {
    if (!content || !commentText.trim()) return;

    if (replyTo) {
      if (replyText.trim() === '') return;
      const rootId = findRootCommentId(comments, replyTo) ?? replyTo;

      const newReply: Comment = {
        id: Math.random().toString(36).substring(7),
        contentId: contentId,
        authorId: 'currentUser',
        authorName: 'Current User',
        text: replyText,
        likesCount: 0,
        isLikedByCurrentUser: false,
        repliesCount: 0,
        replies: [],
        authorImage: 'https://i.pravatar.cc/150?img=3',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setComments(prev => addReplyUnderRoot(prev, rootId, newReply));
      setReplyTo(null);
      setReplyText('');
      return;
    }

    try {
      await addComment(content.id, commentText);
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
    addComment,
  ]);

  const handleLikeCommentOrReply = useCallback(
    (commentId: string, liked: boolean) => {
      setComments(prevComments =>
        updateCommentById(prevComments, commentId, comment => ({
          ...comment,
          isLikedByCurrentUser: liked,
          likesCount: liked
            ? (comment.likesCount || 0) + 1
            : Math.max(0, (comment.likesCount || 1) - 1),
        })),
      );
    },
    [],
  );

  const handleReplyComment = useCallback((commentId: string) => {
    setReplyTo(commentId);
    setReplyText('');
  }, []);

  const handleChangeCommentText = useCallback((text: string) => {
    setCommentText(text);
  }, []);

  return {
    isLiked: content?.isLiked || false,
    toggleLike: handleToggleLike,
    isReposted: content?.isReposted || false,
    toggleRepost: handleToggleRepost,
    isLoading,
    contentData: content,
    isError: !!error,
    error,
    comments,
    commentText,
    onChangeCommentText: handleChangeCommentText,
    onSendComment: handleSendComment,
    onReplyComment: handleReplyComment,
    onLikeCommentOrReply: handleLikeCommentOrReply,
    handleSend: handleSendComment,
    replyTo,
    replyText,
    setReplyText,
    setReplyTo,
    imageCarouselVisible,
    setImageCarouselVisible,
    imageCarouselIndex,
    setImageCarouselIndex,
  };
};

export default useContentDetails;
