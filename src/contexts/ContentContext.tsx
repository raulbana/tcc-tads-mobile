import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import {
  Content,
  ContentCategory,
  Comment,
  CreateContentRequest,
  UpdateContentRequest,
  ContentStats,
  ReportContentDTO,
} from '../types/content';
import {useAuth} from './AuthContext';
import useContentQueries from '../modules/content/services/contentQueryFactory';

interface ContentContextType {
  contents: Content[];
  categories: ContentCategory[];
  isLoading: boolean;
  error: string | null;

  loadContents: (profileMode?: boolean) => Promise<void>;
  loadContentById: (id: string) => Promise<Content | null>;
  createContent: (contentData: CreateContentRequest) => Promise<Content>;
  updateContent: (
    id: string,
    contentData: UpdateContentRequest,
  ) => Promise<Content>;
  deleteContent: (id: string) => Promise<void>;
  toggleLikeContent: (id: string) => Promise<void>;
  toggleRepostContent: (id: string) => Promise<void>;

  addComment: (contentId: string, text: string) => Promise<Comment>;
  updateComment: (commentId: string, text: string) => Promise<Comment>;
  deleteComment: (commentId: string) => Promise<void>;
  toggleLikeComment: (commentId: string) => Promise<void>;

  loadCategories: () => Promise<void>;

  clearError: () => void;
  refreshContent: (id: string) => Promise<void>;

  getContentById: (id: string) => Content | null;
  getContentsByCategory: (categoryId: string) => Content[];
  searchContents: (query: string) => Content[];

  reportContent: (contentId: string, reason: string) => Promise<void>;
  getContentStats: () => Promise<ContentStats>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({children}: {children: ReactNode}) => {
  const {user} = useAuth();

  const contentQueries = useContentQueries(['content']);
  const {
    data: contents = [],
    isLoading: isLoadingContents,
    error: contentsError,
    refetch: refetchContents,
  } = contentQueries.getList(user?.id.toString() || '', false);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = contentQueries.getCategories();

  const createContentMutation = contentQueries.createContent();
  const updateContentMutation = contentQueries.updateContent();
  const deleteContentMutation = contentQueries.deleteContent();
  const toggleLikeMutation = contentQueries.toggleLike();
  const toggleRepostMutation = contentQueries.toggleRepost();
  const createCommentMutation = contentQueries.createComment();
  const reportContentMutation = contentQueries.reportContent();

  const isLoading = isLoadingContents || isLoadingCategories;
  const error = contentsError?.message || categoriesError?.message;

  const clearError = useCallback(() => {}, []);

  const loadContents = useCallback(
    async (profileMode?: boolean) => {
      await refetchContents();
    },
    [refetchContents],
  );

  const loadContentById = useCallback(
    async (id: string) => {
      return contents.find(c => c.id === id) || null;
    },
    [contents],
  );

  const createContent = useCallback(
    async (contentData: CreateContentRequest) => {
      if (!user) throw new Error('User not authenticated');
      return createContentMutation.mutateAsync({
        contentData,
        userId: user.id.toString(),
      });
    },
    [createContentMutation, user],
  );

  const updateContent = useCallback(
    async (id: string, contentData: UpdateContentRequest) => {
      if (!user) throw new Error('User not authenticated');
      return updateContentMutation.mutateAsync({
        id,
        contentData,
        userId: user.id.toString(),
      });
    },
    [updateContentMutation, user],
  );

  const deleteContent = useCallback(
    async (id: string) => {
      return deleteContentMutation.mutateAsync(id);
    },
    [deleteContentMutation],
  );

  const toggleLikeContent = useCallback(
    async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      const content = contents.find(c => c.id === id);
      if (!content) throw new Error('Content not found');

      return toggleLikeMutation.mutateAsync({
        id,
        liked: !content.isLiked,
        userId: user.id.toString(),
      });
    },
    [toggleLikeMutation, user, contents],
  );

  const toggleRepostContent = useCallback(
    async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      const content = contents.find(c => c.id === id);
      if (!content) throw new Error('Content not found');

      return toggleRepostMutation.mutateAsync({
        id,
        reposted: !content.isReposted,
        userId: user.id.toString(),
      });
    },
    [toggleRepostMutation, user, contents],
  );

  const addComment = useCallback(
    async (contentId: string, text: string) => {
      if (!user) throw new Error('User not authenticated');

      await createCommentMutation.mutateAsync({
        contentId: parseInt(contentId),
        authorId: user.id,
        text,
      });

      const mockComment: Comment = {
        id: Math.random().toString(36).substring(7),
        contentId,
        authorId: user.id.toString(),
        authorName: user.name,
        text,
        likesCount: 0,
        isLikedByCurrentUser: false,
        repliesCount: 0,
        replies: [],
        authorImage:
          user.profilePictureUrl || 'https://i.pravatar.cc/150?img=3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return mockComment;
    },
    [createCommentMutation, user],
  );

  const updateComment = useCallback(async (commentId: string, text: string) => {
    throw new Error('Not implemented yet');
  }, []);

  const deleteComment = useCallback(async (commentId: string) => {
    throw new Error('Not implemented yet');
  }, []);

  const toggleLikeComment = useCallback(async (commentId: string) => {
    throw new Error('Not implemented yet');
  }, []);

  const loadCategories = useCallback(async () => {}, []);

  const refreshContent = useCallback(async (id: string) => {}, []);

  const getContentById = useCallback(
    (id: string) => {
      return contents.find(c => c.id === id) || null;
    },
    [contents],
  );

  const getContentsByCategory = useCallback(
    (categoryId: string) => {
      return contents.filter(c => c.categories?.includes(categoryId));
    },
    [contents],
  );

  const searchContents = useCallback(
    (query: string) => {
      const lowercaseQuery = query.toLowerCase();
      return contents.filter(
        c =>
          c.title.toLowerCase().includes(lowercaseQuery) ||
          c.description.toLowerCase().includes(lowercaseQuery),
      );
    },
    [contents],
  );

  const reportContent = useCallback(
    async (contentId: string, reason: string) => {
      if (!user) throw new Error('User not authenticated');
      return reportContentMutation.mutateAsync({
        contentId,
        reason,
        userId: user.id.toString(),
      });
    },
    [reportContentMutation, user],
  );

  const getContentStats = useCallback(async () => {
    return {
      totalContents: contents.length,
      totalCategories: categories.length,
      totalComments: 0,
      totalLikes: 0,
    };
  }, [contents, categories]);

  const value = useMemo(
    () => ({
      contents,
      categories,
      isLoading,
      error,
      loadContents,
      loadContentById,
      createContent,
      updateContent,
      deleteContent,
      toggleLikeContent,
      toggleRepostContent,
      addComment,
      updateComment,
      deleteComment,
      toggleLikeComment,
      loadCategories,
      clearError,
      refreshContent,
      getContentById,
      getContentsByCategory,
      searchContents,
      reportContent,
      getContentStats,
    }),
    [
      contents,
      categories,
      isLoading,
      error,
      loadContents,
      loadContentById,
      createContent,
      updateContent,
      deleteContent,
      toggleLikeContent,
      toggleRepostContent,
      addComment,
      updateComment,
      deleteComment,
      toggleLikeComment,
      loadCategories,
      clearError,
      refreshContent,
      getContentById,
      getContentsByCategory,
      searchContents,
      reportContent,
      getContentStats,
    ],
  );

  return (
    <ContentContext.Provider value={{...value, error: value.error ?? null}}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
