import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ContentParamList} from '../../../navigation/routes';
import {RouteProp} from '@react-navigation/native';
import useContentQueries from '../../content/services/contentQueryFactory';
import {Comment} from '../../../types/content';

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
  useEffect(() => {
    if (contentData) {
      setContent(contentData);
      setIsLiked(contentData.isLiked);
      setIsReposted(contentData.isReposted);
      setComments(contentData.comments || []);
    }
  }, [contentData]);

  const onSendComment = () => {
    if (commentText.trim() === '') return;
    const newComment: Comment = {
      id: Math.random().toString(36).substring(7),
      contentId: contentId,
      userId: 'currentUser',
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

  const onLikeComment = (commentId: string, liked: boolean) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLikedByCurrentUser: liked,
              likesCount: liked
                ? (comment.likesCount || 0) + 1
                : (comment.likesCount || 1) - 1,
            }
          : comment,
      ),
    );
  };

  const onLikeReplyComment = (
    commentId: string,
    replyId: string,
    liked: boolean,
  ) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === replyId
                  ? {
                      ...reply,
                      isLikedByCurrentUser: liked,
                      likesCount: liked
                        ? (reply.likesCount || 0) + 1
                        : (reply.likesCount || 1) - 1,
                    }
                  : reply,
              ),
            }
          : comment,
      ),
    );
  };

  const onLikeCommentOrReply = (commentId: string, liked: boolean) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      onLikeComment(commentId, liked);
    } else {
      comments.forEach(c => {
        const reply = c.replies?.find(r => r.id === commentId);
        if (reply) {
          onLikeReplyComment(c.id, commentId, liked);
        }
      });
    }
  };

  const onReplyComment = (commentId: string) => {
    console.log('Reply to comment:', commentId);
  };

  const onChangeCommentText = (text: string) => {
    setCommentText(text);
  };

  useEffect(() => {
    if (contentData) {
      console.log('Content data updated:', contentData);
    }
  }, [contentData]);

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
    onLikeComment,
    onReplyComment,
    onLikeCommentOrReply,
  };
};
export default useContentDetails;
