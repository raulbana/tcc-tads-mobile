import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
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
import contentServices from '../modules/content/services/contentServices';
import {useAuth} from './AuthContext';

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
  const [contents, setContents] = useState<Content[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadContents = useCallback(async (profileMode?: boolean) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await contentServices.getAll();
      setContents(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar conteúdos';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadContentById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const content = await contentServices.getById(id);
      setContents(prevContents =>
        prevContents.map(c => (c.id === id ? content : c)),
      );
      return content;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar conteúdo';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createContent = useCallback(
    async (contentData: CreateContentRequest) => {
      try {
        setIsLoading(true);
        setError(null);
        const serviceData = {
          title: contentData.title,
          description: contentData.description,
          images: contentData.images || [],
          video: contentData.video,
          categories: contentData.categories,
        };
        const newContent = await contentServices.createContent(serviceData);
        setContents(prevContents => [newContent, ...prevContents]);
        return newContent;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao criar conteúdo';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateContent = useCallback(
    async (id: string, contentData: UpdateContentRequest) => {
      try {
        setIsLoading(true);
        setError(null);
        setContents(prevContents =>
          prevContents.map(c => (c.id === id ? {...c, ...contentData} : c)),
        );
        throw new Error('Update content not implemented yet');
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao atualizar conteúdo';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteContent = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setContents(prevContents => prevContents.filter(c => c.id !== id));
      throw new Error('Delete content not implemented yet');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao deletar conteúdo';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleLikeContent = useCallback(async (id: string) => {
    try {
      setError(null);
      setContents(prevContents =>
        prevContents.map(c => {
          if (c.id === id) {
            return {
              ...c,
              isLiked: !c.isLiked,
              likesCount: c.isLiked
                ? (c.likesCount || 0) - 1
                : (c.likesCount || 0) + 1,
            };
          }
          return c;
        }),
      );
      throw new Error('Toggle like not implemented yet');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao curtir/descurtir conteúdo';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const toggleRepostContent = useCallback(async (id: string) => {
    try {
      setError(null);
      setContents(prevContents =>
        prevContents.map(c => {
          if (c.id === id) {
            return {
              ...c,
              isReposted: !c.isReposted,
              repostsCount: c.isReposted
                ? (c.repostsCount || 0) - 1
                : (c.repostsCount || 0) + 1,
            };
          }
          return c;
        }),
      );
      throw new Error('Toggle repost not implemented yet');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao repostar conteúdo';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const addComment = useCallback(
    async (contentId: string, text: string) => {
      try {
        setError(null);
        const newComment: Comment = {
          id: Math.random().toString(36).substring(7),
          contentId: contentId,
          text: text,
          authorId: user?.id?.toString() || 'currentUser',
          authorName: user?.name || 'Current User',
          authorImage:
            user?.profilePictureUrl || 'https://i.pravatar.cc/150?img=3',
          createdAt: new Date(),
          updatedAt: new Date(),
          likesCount: 0,
          isLikedByCurrentUser: false,
          repliesCount: 0,
          replies: [],
        };

        setContents(prevContents =>
          prevContents.map(c => {
            if (c.id === contentId) {
              return {
                ...c,
                comments: [newComment, ...c.comments],
                commentsCount: c.commentsCount + 1,
              };
            }
            return c;
          }),
        );

        return newComment;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao adicionar comentário';
        setError(errorMessage);
        throw err;
      }
    },
    [user],
  );

  const updateComment = useCallback(async (commentId: string, text: string) => {
    try {
      setError(null);
      throw new Error('Update comment not implemented yet');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao atualizar comentário';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteComment = useCallback(async (commentId: string) => {
    try {
      setError(null);
      throw new Error('Delete comment not implemented yet');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao deletar comentário';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const toggleLikeComment = useCallback(async (commentId: string) => {
    try {
      setError(null);
      throw new Error('Toggle like comment not implemented yet');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao curtir comentário';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await contentServices.getCategories();
      setCategories(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar categorias';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshContent = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await loadContentById(id);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao atualizar conteúdo';
        setError(errorMessage);
        throw err;
      }
    },
    [loadContentById],
  );

  const getContentById = useCallback(
    (id: string) => {
      return contents.find(content => content.id === id) || null;
    },
    [contents],
  );

  const getContentsByCategory = useCallback(
    (categoryId: string) => {
      return contents.filter(content => content.category.id === categoryId);
    },
    [contents],
  );

  const searchContents = useCallback(
    (query: string) => {
      if (!query.trim()) return contents;

      const lowercaseQuery = query.toLowerCase();
      return contents.filter(
        content =>
          content.title.toLowerCase().includes(lowercaseQuery) ||
          content.description.toLowerCase().includes(lowercaseQuery) ||
          content.category.name.toLowerCase().includes(lowercaseQuery),
      );
    },
    [contents],
  );

  const reportContent = useCallback(
    async (contentId: string, reason: string) => {
      try {
        setError(null);
        await contentServices.reportContent(contentId, reason);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao reportar conteúdo';
        setError(errorMessage);
        throw err;
      }
    },
    [],
  );

  const getContentStats = useCallback(async (): Promise<ContentStats> => {
    try {
      setError(null);
      return {
        totalContents: contents.length,
        totalCategories: categories.length,
        totalComments: contents.reduce(
          (acc, content) => acc + content.commentsCount,
          0,
        ),
        totalLikes: contents.reduce(
          (acc, content) => acc + (content.likesCount || 0),
          0,
        ),
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao obter estatísticas';
      setError(errorMessage);
      throw err;
    }
  }, [contents, categories]);

  const memoizedContents = useMemo(() => contents, [contents]);
  const memoizedCategories = useMemo(() => categories, [categories]);


  return (
    <ContentContext.Provider
      value={{
        contents: memoizedContents,
        categories: memoizedCategories,
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
      }}>
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
