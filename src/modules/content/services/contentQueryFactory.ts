import {
  QueryKey,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import contentServices from './contentServices';
import {
  Content,
  ContentCategory,
  CreateContentRequest,
  CreateContentWithFilesRequest,
  UpdateContentRequest,
  Comment,
} from '../../../types/content';
import {contentCache} from './contentCache';

export const contentQueryFactory = (baseKey: QueryKey) => {
  const queryClient = useQueryClient();

  return {
    getById: (contentId: string, userId: string) =>
      useQuery<Content>({
        queryKey: [...baseKey, 'contentDetails', contentId, userId],
        queryFn: () => contentServices.getById(contentId, userId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!contentId && !!userId,
      }),

    getList: (userId: string, profileMode?: boolean) =>
      useQuery<Content[]>({
        queryKey: [...baseKey, 'contentList', userId, profileMode],
        queryFn: () => contentServices.getAll(userId, profileMode),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!userId,
      }),

    getCategories: () =>
      useQuery<ContentCategory[]>({
        queryKey: [...baseKey, 'contentCategories'],
        queryFn: () => contentServices.getCategories(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        refetchOnWindowFocus: false,
      }),

    createContent: () =>
      useMutation<
        Content,
        Error,
        {contentData: CreateContentRequest; userId: string}
      >({
        mutationFn: ({contentData, userId}) =>
          contentServices.createContent(contentData, userId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
          });
        },
      }),

    createContentWithFiles: () =>
      useMutation<
        Content,
        Error,
        {contentData: CreateContentWithFilesRequest; userId: string}
      >({
        mutationFn: ({contentData, userId}) =>
          contentServices.createContentWithFiles(contentData, userId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
          });
        },
      }),

    updateContent: () =>
      useMutation<
        Content,
        Error,
        {id: string; contentData: UpdateContentRequest; userId: string}
      >({
        mutationFn: ({id, contentData, userId}) =>
          contentServices.updateContent(id, contentData, userId),
        onSuccess: data => {
          queryClient.setQueryData(
            [...baseKey, 'contentDetails', data.id],
            data,
          );
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
          });
        },
      }),

    deleteContent: () =>
      useMutation<void, Error, string>({
        mutationFn: contentId => contentServices.deleteContent(contentId),
        onSuccess: (_, contentId) => {
          queryClient.removeQueries({
            queryKey: [...baseKey, 'contentDetails', contentId],
          });
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
          });
        },
      }),

    toggleLike: () =>
      useMutation<void, Error, {id: string; liked: boolean; userId: string}>({
        mutationFn: ({id, liked, userId}) =>
          contentServices.toggleLike(id, liked, userId),
        onSuccess: (_, {id}) => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentDetails', id],
          });
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
          });
        },
      }),

    toggleRepost: () =>
      useMutation<void, Error, {id: string; reposted: boolean; userId: string}>(
        {
          mutationFn: ({id, reposted, userId}) =>
            contentServices.toggleRepost(id, reposted, userId),
          onSuccess: (_, {id}) => {
            queryClient.invalidateQueries({
              queryKey: [...baseKey, 'contentDetails', id],
            });
            queryClient.invalidateQueries({
              queryKey: [...baseKey, 'contentList'],
            });
          },
        },
      ),

    createComment: () =>
      useMutation<
        void,
        Error,
        {
          contentId: number;
          authorId: number;
          text: string;
          replyToCommentId?: number;
        }
      >({
        mutationFn: commentData => contentServices.createComment(commentData),
        onSuccess: (_, {contentId}) => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentDetails', contentId.toString()],
            exact: false,
          });
          contentCache.invalidateContent(contentId.toString());
        },
      }),

    reportContent: () =>
      useMutation<
        void,
        Error,
        {contentId: string; reason: string; userId: string}
      >({
        mutationFn: ({contentId, reason, userId}) =>
          contentServices.reportContent(contentId, reason, userId),
      }),

    saveContent: () =>
      useMutation<void, Error, string>({
        mutationFn: contentId => contentServices.saveContent(contentId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'savedContent'],
          });
        },
      }),

    unsaveContent: () =>
      useMutation<void, Error, string>({
        mutationFn: contentId => contentServices.unsaveContent(contentId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'savedContent'],
          });
        },
      }),

    toggleSaveContent: () =>
      useMutation<
        void,
        Error,
        {contentId: string; userId: number; control: boolean}
      >({
        mutationFn: ({contentId, userId, control}) =>
          contentServices.toggleSaveContent(contentId, userId, control),
        onSuccess: (_, {contentId, userId, control}) => {
          queryClient.setQueryData<Content>(
            [...baseKey, 'contentDetails', contentId, userId.toString()],
            previous => (previous ? {...previous, isSaved: control} : previous),
          );

          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
            exact: false,
          });

          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'savedContent'],
          });
        },
      }),

    getSavedContent: () =>
      useQuery<Content[]>({
        queryKey: [...baseKey, 'savedContent'],
        queryFn: () => contentServices.getSavedContent(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
      }),

    getComments: (contentId: string, page?: number, size?: number) =>
      useQuery<Comment[]>({
        queryKey: [...baseKey, 'comments', contentId, page, size],
        queryFn: () => contentServices.getComments(contentId, page, size),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        enabled: !!contentId,
      }),

    updateComment: () =>
      useMutation<Comment, Error, {commentId: string; text: string}>({
        mutationFn: ({commentId, text}) =>
          contentServices.updateComment(commentId, text),
        onSuccess: (_, {commentId}) => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'comments'],
          });
        },
      }),

    deleteComment: () =>
      useMutation<void, Error, string>({
        mutationFn: commentId => contentServices.deleteComment(commentId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'comments'],
          });
        },
      }),

    likeComment: () =>
      useMutation<void, Error, {commentId: string; liked: boolean}>({
        mutationFn: ({commentId, liked}) =>
          contentServices.likeComment(commentId, liked),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'comments'],
          });
        },
      }),

    getCommentReplies: (commentId: string, page?: number, size?: number) =>
      useQuery<Comment[]>({
        queryKey: [...baseKey, 'commentReplies', commentId, page, size],
        queryFn: () => contentServices.getCommentReplies(commentId, page, size),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        enabled: !!commentId,
      }),

    uploadMedia: () =>
      useMutation<any, Error, FormData>({
        mutationFn: files => contentServices.uploadMedia(files),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [...baseKey, 'contentList'],
          });
        },
      }),
  };
};

const useContentQueries = (queryKey: QueryKey) => {
  const queries = contentQueryFactory(queryKey);
  return {
    ...queries,
  };
};

export default useContentQueries;
