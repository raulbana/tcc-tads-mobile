import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {
  Content,
  ContentCategory,
  CreateContentRequest,
  CreateContentWithFilesRequest,
  UploadFile,
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

    contentCache.setContent(contentId, response.data);
    return response.data;
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

  createContentWithFiles: async (
    contentData: CreateContentWithFilesRequest,
    userId: string,
  ): Promise<Content> => {
    const headers = {
      'x-user-id': userId,
    };

    let uploadedMedia: any[] = [];

    if (contentData.files && contentData.files.length > 0) {
      const formData = new FormData();
      contentData.files.forEach((file, index) => {
        formData.append('files', {
          uri: file.uri,
          name: file.fileName || `upload_${index}`,
          type: file.type.startsWith('video') ? 'video/mp4' : 'image/jpeg',
        } as any);
      });

      const uploadRes: any = await contentServices.uploadMedia(formData);

      uploadedMedia = Array.isArray(uploadRes?.media)
        ? uploadRes.media
        : Array.isArray(uploadRes)
        ? uploadRes
        : [];
    }

    // Build media array with altText for API
    const mediaArray = uploadedMedia.map(m => ({
      url: m.url,
      contentType: m.contentType || m.type,
      contentSize: m.contentSize || 0,
      altText: m.altText || contentData.title,
    }));

    const createRequest = {
      title: contentData.title,
      description: contentData.description,
      subtitle: contentData.subtitle,
      subcontent: contentData.subcontent,
      categoryIds: contentData.categories,
      authorId: parseInt(userId),
      media: mediaArray,
    };

    const response = await api.post(apiRoutes.content.create, createRequest, {
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

  uploadMedia: async (files: FormData | File[]): Promise<any> => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const response = await api.post(apiRoutes.media.upload, files, {headers});
    return response.data;
  },
};

export default contentServices;
