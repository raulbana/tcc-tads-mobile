import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import {
  Content,
  ContentCategory,
  ContentCategoryDTO,
  CreateContentRequest,
  UpdateContentRequest,
  ToggleDTO,
  CommentCreatorDTO,
  ReportContentDTO,
} from '../../../types/content';
import {MMKVStorage} from '../../../storage/mmkvStorage';
import {contentCache} from './contentCache';
import {sanitizeContentData, sanitizeCategoriesData} from '../utils/contentValidation';

const api = apiFactory(BASE_URL);

const getCurrentUserId = (): string => {
  const userData = MMKVStorage.getString('auth_user_v1');
  if (userData) {
    const user = JSON.parse(userData);
    return user.id?.toString() || '1';
  }
  return '1';
};

const contentServices = {
  getById: async (contentId: string): Promise<Content> => {
    const cached = contentCache.getContent(contentId);
    if (cached) {
      return cached;
    }

    const headers = {
      'x-user-id': getCurrentUserId(),
    };
    const response = await api.get(apiRoutes.content.byId(contentId), {headers});
    
    const apiContent = response.data;
    const sanitizedContent = sanitizeContentData({
      id: apiContent.id.toString(),
      title: apiContent.title,
      description: apiContent.description,
      subtitle: apiContent.subtitle,
      subcontent: apiContent.subcontent,
      createdAt: new Date(apiContent.createdAt),
      updatedAt: new Date(apiContent.updatedAt),
      coverUrl: apiContent.cover?.url || '',
      images: apiContent.media?.map((media: any) => media.url) || [],
      video: apiContent.media?.find((media: any) => media.contentType.startsWith('video/'))?.url,
      category: {
        id: apiContent.categoryId?.toString() || '1',
        name: apiContent.category || 'Unknown',
        auditable: false,
      },
      isReposted: apiContent.isReposted || false,
      isLiked: apiContent.isLiked || false,
      likesCount: apiContent.likesCount || 0,
      repostsCount: apiContent.repostsCount || 0,
      authorId: apiContent.authorId?.toString() || getCurrentUserId(),
      repostedFromContentId: apiContent.repostedFromContentId?.toString(),
      repostedByUserId: apiContent.repostedByUserId?.toString(),
      commentsCount: apiContent.commentsCount || 0,
      comments: apiContent.comments || [],
    });
    
    if (!sanitizedContent) {
      throw new Error('Invalid content data received from API');
    }
    
    contentCache.setContent(contentId, sanitizedContent);
    return sanitizedContent;
  },

  getAll: async (profileMode?: boolean): Promise<Content[]> => {
    if (!profileMode) {
      const cached = contentCache.getContents();
      if (cached) {
        return cached;
      }
    }

    const headers = {
      'x-user-id': getCurrentUserId(),
      ...(profileMode && {'x-profile': 'true'}),
    };
    const response = await api.get(apiRoutes.content.all, {headers});
    
    const apiContents = response.data;
    const mappedContents: Content[] = apiContents.map((apiContent: any) => ({
      id: apiContent.id.toString(),
      title: apiContent.title,
      description: apiContent.description || '',
      subtitle: apiContent.subtitle,
      subcontent: apiContent.subcontent,
      createdAt: new Date(apiContent.createdAt),
      updatedAt: new Date(apiContent.updatedAt),
      coverUrl: apiContent.cover?.url || '',
      images: apiContent.media?.map((media: any) => media.url) || [],
      video: apiContent.media?.find((media: any) => media.contentType.startsWith('video/'))?.url,
      category: {
        id: apiContent.categoryId?.toString() || '1',
        name: apiContent.category || 'Unknown',
        auditable: false,
      },
      isReposted: apiContent.isReposted || false,
      isLiked: apiContent.isLiked || false,
      likesCount: apiContent.likesCount || 0,
      repostsCount: apiContent.repostsCount || 0,
      authorId: apiContent.author?.id?.toString() || getCurrentUserId(),
      repostedFromContentId: apiContent.repostedFromContentId?.toString(),
      repostedByUserId: apiContent.repostedByUserId?.toString(),
      commentsCount: apiContent.commentsCount || 0,
      comments: apiContent.comments || [],
    }));
    
    if (!profileMode) {
      contentCache.setContents(mappedContents);
    }
    
    return mappedContents;
  },

  getCategories: async (): Promise<ContentCategory[]> => {
    const cached = contentCache.getCategories();
    if (cached) {
      return cached;
    }

    const response = await api.get(apiRoutes.content.categories);
    const categoriesData: ContentCategoryDTO[] = response.data;
    const mappedCategories: ContentCategory[] = categoriesData.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      auditable: cat.auditable,
    }));
    const sanitizedCategories = sanitizeCategoriesData(mappedCategories);
    contentCache.setCategories(sanitizedCategories);
    return sanitizedCategories;
  },

  createContent: async (contentData: CreateContentRequest): Promise<Content> => {
    const createData = {
      title: contentData.title,
      description: contentData.description,
      subtitle: contentData.subtitle,
      subcontent: contentData.subcontent,
      categoryId: parseInt(contentData.categories[0]) || 1,
      authorId: parseInt(getCurrentUserId()),
      media: contentData.images?.map((imageUri, index) => ({
        url: imageUri,
        contentType: 'image/jpeg',
        contentSize: 0,
        altText: `Image ${index + 1}`,
        createdAt: new Date().toISOString(),
      })) || [],
    };

    const response = await api.post(apiRoutes.content.create, createData);
    contentCache.invalidateAll();
    
    const apiContent = response.data;
    const mappedContent: Content = {
      id: apiContent.id.toString(),
      title: apiContent.title,
      description: apiContent.description,
      subtitle: apiContent.subtitle,
      subcontent: apiContent.subcontent,
      createdAt: new Date(apiContent.createdAt),
      updatedAt: new Date(apiContent.updatedAt),
      coverUrl: apiContent.cover?.url || '',
      images: apiContent.media?.map((media: any) => media.url) || [],
      video: apiContent.media?.find((media: any) => media.contentType.startsWith('video/'))?.url,
      category: {
        id: apiContent.categoryId.toString(),
        name: apiContent.category || 'Unknown',
        auditable: false,
      },
      isReposted: apiContent.isReposted || false,
      isLiked: apiContent.isLiked || false,
      likesCount: apiContent.likesCount || 0,
      repostsCount: apiContent.repostsCount || 0,
      authorId: apiContent.authorId.toString(),
      repostedFromContentId: apiContent.repostedFromContentId?.toString(),
      repostedByUserId: apiContent.repostedByUserId?.toString(),
      commentsCount: apiContent.commentsCount || 0,
      comments: apiContent.comments || [],
    };
    
    return mappedContent;
  },

  updateContent: async (id: string, contentData: UpdateContentRequest): Promise<Content> => {
    const headers = {
      'x-user-id': getCurrentUserId(),
    };
    const updateData = {
      title: contentData.title,
      description: contentData.description,
      subtitle: contentData.subtitle,
      subcontent: contentData.subcontent,
      categoryId: contentData.categories ? parseInt(contentData.categories[0]) : undefined,
    };

    const response = await api.put(apiRoutes.content.update(id), updateData, {headers});
    contentCache.invalidateContent(id);
    return response.data;
  },

  deleteContent: async (id: string): Promise<void> => {
    await api.delete(apiRoutes.content.delete(id));
    contentCache.invalidateContent(id);
  },

  toggleLike: async (id: string, liked: boolean): Promise<void> => {
    const toggleData: ToggleDTO = {
      userId: parseInt(getCurrentUserId()),
      control: liked,
    };
    await api.patch(apiRoutes.content.like(id), toggleData);
  },

  toggleRepost: async (id: string, reposted: boolean): Promise<void> => {
    const toggleData: ToggleDTO = {
      userId: parseInt(getCurrentUserId()),
      control: reposted,
    };
    await api.patch(apiRoutes.content.repost(id), toggleData);
  },

  createComment: async (commentData: CommentCreatorDTO): Promise<void> => {
    await api.post(apiRoutes.comment.create, commentData);
  },

  reportContent: async (contentId: string, reason: string): Promise<void> => {
    const reportData: ReportContentDTO = {
      reporterId: parseInt(getCurrentUserId()),
      reason,
    };
    await api.post(apiRoutes.content.report(contentId), reportData);
  },
};

export default contentServices;
