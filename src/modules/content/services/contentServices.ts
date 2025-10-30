import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {
  Content,
  ContentCategory,
  CreateContentRequest,
  UpdateContentRequest,
  ToggleDTO,
  CommentCreatorDTO,
  ReportContentDTO,
  Comment,
} from '../../../types/content';
import {contentCache} from './contentCache';

const api = apiFactory(BASE_URL);

const contentServices = {
  getById: async (contentId: string, userId: string): Promise<Content> => {
    const cached = contentCache.getContent(contentId);
    if (cached) {
      return cached;
    }

    const headers = {
      'x-user-id': userId,
    };

    const response = await api.get(apiRoutes.content.byId(contentId), {
      headers,
    });

    const raw = response.data;
    const mapped: Content = {
      id: String(raw.id),
      title: raw.title,
      description: raw.description,
      subtitle: raw.subtitle,
      subcontent: raw.subcontent,
      categories: raw.categories || [],
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      isLiked: !!raw.isLiked,
      isReposted: !!raw.isReposted,
      isSaved: !!raw.isSaved,
      likesCount: raw.likesCount,
      repostsCount: raw.repostsCount,
      authorId: raw.author?.id ? String(raw.author.id) : '',
      author: raw.author,
      cover: raw.cover,
      media: raw.media || [],
      commentsCount: raw.commentsCount || 0,
      comments: (raw.comments || []).map((c: any) => ({
        id: String(c.id),
        contentId: String(raw.id),
        text: c.text,
        authorId: c.author?.id ? String(c.author.id) : '',
        authorName: c.author?.name || 'Usuário',
        authorImage: '',
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        likesCount: c.likesCount,
        isLikedByCurrentUser: c.isLiked,
        repliesCount: c.repliesCount,
        replies: [],
      })),
    };

    contentCache.setContent(contentId, mapped);
    return mapped;
  },

  getAll: async (userId: string, profileMode?: boolean): Promise<Content[]> => {
    if (!profileMode) {
      const cached = contentCache.getContents();
      if (cached) {
        return cached;
      }
    }

    const headers = {
      'x-user-id': userId,
      ...(profileMode && {'x-profile': 'true'}),
    };
    const response = await api.get(apiRoutes.content.all, {headers});

    if (!profileMode) {
      contentCache.setContents(response.data);
    }

    return response.data;
  },

  getCategories: async (): Promise<ContentCategory[]> => {
    const cached = contentCache.getCategories();
    if (cached) {
      return cached;
    }

    const response = await api.get(apiRoutes.content.categories);
    return response.data;
  },

  createContent: async (
    contentData: CreateContentRequest,
    userId: string,
  ): Promise<Content> => {
    const headers = {
      'x-user-id': userId,
    };

    const response = await api.post(apiRoutes.content.create, contentData, {
      headers,
    });
    contentCache.invalidateAll();

    return response.data;
  },

  updateContent: async (
    id: string,
    contentData: UpdateContentRequest,
    userId: string,
  ): Promise<Content> => {
    const headers = {
      'x-user-id': userId,
    };
    const updateData = {
      title: contentData.title,
      description: contentData.description,
      subtitle: contentData.subtitle,
      subcontent: contentData.subcontent,
      categoryId: contentData.categories
        ? parseInt(contentData.categories[0])
        : undefined,
    };

    const response = await api.put(apiRoutes.content.update(id), updateData, {
      headers,
    });
    contentCache.invalidateContent(id);

    return response.data;
  },

  deleteContent: async (id: string): Promise<void> => {
    await api.delete(apiRoutes.content.delete(id));
    contentCache.invalidateContent(id);
  },

  toggleLike: async (
    id: string,
    liked: boolean,
    userId: string,
  ): Promise<void> => {
    const toggleData: ToggleDTO = {
      userId: parseInt(userId),
      control: liked,
    };
    await api.patch(apiRoutes.content.like(id), toggleData);
  },

  toggleRepost: async (
    id: string,
    reposted: boolean,
    userId: string,
  ): Promise<void> => {
    const toggleData: ToggleDTO = {
      userId: parseInt(userId),
      control: reposted,
    };
    await api.patch(apiRoutes.content.repost(id), toggleData);
  },

  createComment: async (commentData: CommentCreatorDTO): Promise<void> => {
    await api.post(
      apiRoutes.content.comments(commentData.contentId.toString()),
      commentData,
    );
  },

  reportContent: async (
    contentId: string,
    reason: string,
    userId: string,
  ): Promise<void> => {
    const reportData: ReportContentDTO = {
      reporterId: parseInt(userId),
      reason,
    };
    await api.post(apiRoutes.content.report(contentId), reportData);
  },

  getUserContent: async (userId: string): Promise<Content[]> => {
    const response = await api.get(apiRoutes.content.user(userId));
    return response.data;
  },

  getSavedContent: async (): Promise<Content[]> => {
    const response = await api.get(apiRoutes.content.saved);
    return response.data;
  },

  unsaveContent: async (contentId: string): Promise<void> => {
    await api.patch(apiRoutes.content.save(contentId), {saved: false});
  },

  saveContent: async (contentId: string): Promise<void> => {
    await api.patch(apiRoutes.content.save(contentId), {saved: true});
  },

  toggleSaveContent: async (
    contentId: string,
    userId: string,
    control: boolean,
  ): Promise<void> => {
    await api.patch(apiRoutes.content.save(contentId), {
      control: control,
      userId: userId,
    });
  },

  getComments: async (
    contentId: string,
    page?: number,
    size?: number,
  ): Promise<Comment[]> => {
    const response = await api.get(apiRoutes.content.comments(contentId), {
      params: {page, size},
    });
    return response.data;
  },

  updateComment: async (commentId: string, text: string): Promise<Comment> => {
    const response = await api.put(apiRoutes.content.comment(commentId), {
      text,
    });
    return response.data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    await api.delete(apiRoutes.content.comment(commentId));
  },

  likeComment: async (commentId: string, liked: boolean): Promise<void> => {
    await api.patch(apiRoutes.content.commentLike(commentId), {liked});
  },

  getCommentReplies: async (
    commentId: string,
    page?: number,
    size?: number,
  ): Promise<Comment[]> => {
    const response = await api.get(
      apiRoutes.content.commentReplies(commentId),
      {
        params: {page, size},
      },
    );
    return response.data;
  },

  uploadMedia: async (files: FormData): Promise<any> => {
    const response = await api.post(apiRoutes.media.upload, files, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  },
};

export default contentServices;
