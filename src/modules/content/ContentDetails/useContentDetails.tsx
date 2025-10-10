import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ContentParamList} from '../../../navigation/routes';
import {RouteProp} from '@react-navigation/native';
import useContentQueries from '../../content/services/contentQueryFactory';
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
  const {getById} = useContentQueries(['content']);
  const {data: contentData, isLoading, isError, refetch} = getById(contentId);

  const [isLiked, setIsLiked] = useState(contentData?.isLiked);
  const [isReposted, setIsReposted] = useState(contentData?.isReposted);
  const [content, setContent] = useState(contentData);
  const [comments, setComments] = useState(contentData?.comments || []);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const [imageCarouselVisible, setImageCarouselVisible] = useState(false);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);

  useEffect(() => {
    if (contentData) {
      setContent(contentData);
      setIsLiked(contentData.isLiked);
      setIsReposted(contentData.isReposted);
      setComments(contentData.comments || []);
    }
  }, [isLoading, contentData, refetch]);

  const onSendComment = () => {
    if (commentText.trim() === '') return;
    const newComment: Comment = {
      id: Math.random().toString(36).substring(7),
      contentId: contentId,
      authorId: 'currentUser',
      authorName: 'Current User',
      text: commentText,
      likesCount: 0,
      isLikedByCurrentUser: false,
      repliesCount: 0,
      replies: [],
      authorImage: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setComments(prevComments => [newComment, ...prevComments]);
    setCommentText('');
  };

  const toggleLike = () => {
    setIsLiked(prev => !prev);
  };

  const toggleRepost = () => {
    setIsReposted(prev => !prev);
  };

  const onLikeCommentOrReply = (commentId: string, liked: boolean) => {
    setComments(prevComments =>
      updateCommentById(prevComments, commentId, comment => ({
        ...comment,
        isLikedByCurrentUser: liked,
        likesCount: liked
          ? (comment.likesCount || 0) + 1
          : Math.max(0, (comment.likesCount || 1) - 1),
      })),
    );
  };

  const onReplyComment = (commentId: string) => {
    setReplyTo(commentId);
    setReplyText('');
  };

  const onChangeCommentText = (text: string) => {
    setCommentText(text);
  };

  const handleSend = () => {
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

    if (commentText.trim() === '') return;
    const newComment: Comment = {
      id: Math.random().toString(36).substring(7),
      contentId: contentId,
      authorId: 'currentUser',
      authorName: 'Current User',
      text: commentText,
      likesCount: 0,
      isLikedByCurrentUser: false,
      repliesCount: 0,
      replies: [],
      authorImage: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  return {
    isLiked,
    toggleLike,
    isReposted,
    toggleRepost,
    isLoading,
    contentData,
    isError,
    refetch,
    comments,
    commentText,
    onChangeCommentText,
    onSendComment,
    content,
    onReplyComment,
    onLikeCommentOrReply,
    handleSend,
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
