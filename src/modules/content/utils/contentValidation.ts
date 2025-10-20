import {Content, ContentCategory, Comment, CreateContentRequest} from '../../../types/content';

export const validateContent = (content: Content): boolean => {
  if (!content) return false;
  
  const requiredFields = ['id', 'title', 'description', 'createdAt', 'updatedAt'];
  const hasRequiredFields = requiredFields.every(field => content[field as keyof Content] != null);
  
  if (!hasRequiredFields) return false;
  
  if (typeof content.title !== 'string' || content.title.trim().length === 0) return false;
  if (typeof content.description !== 'string' || content.description.trim().length === 0) return false;
  if (!(content.createdAt instanceof Date)) return false;
  if (!(content.updatedAt instanceof Date)) return false;
  
  return true;
};

export const validateContentCategory = (category: ContentCategory): boolean => {
  if (!category) return false;
  
  if (typeof category.id !== 'string' || category.id.trim().length === 0) return false;
  if (typeof category.name !== 'string' || category.name.trim().length === 0) return false;
  if (typeof category.auditable !== 'boolean') return false;
  
  return true;
};

export const validateComment = (comment: Comment): boolean => {
  if (!comment) return false;
  
  if (typeof comment.id !== 'string' || comment.id.trim().length === 0) return false;
  if (typeof comment.contentId !== 'string' || comment.contentId.trim().length === 0) return false;
  if (typeof comment.text !== 'string' || comment.text.trim().length === 0) return false;
  if (typeof comment.authorId !== 'string' || comment.authorId.trim().length === 0) return false;
  if (typeof comment.authorName !== 'string' || comment.authorName.trim().length === 0) return false;
  if (!(comment.createdAt instanceof Date)) return false;
  if (!(comment.updatedAt instanceof Date)) return false;
  
  return true;
};

export const validateCreateContentRequest = (request: CreateContentRequest): boolean => {
  if (!request) return false;
  
  if (typeof request.title !== 'string' || request.title.trim().length === 0) return false;
  if (typeof request.description !== 'string' || request.description.trim().length === 0) return false;
  if (!Array.isArray(request.categories) || request.categories.length === 0) return false;
  
  if (request.categories.some(cat => typeof cat !== 'string' || cat.trim().length === 0)) return false;
  
  if (request.images && !Array.isArray(request.images)) return false;
  if (request.images && request.images.some(img => typeof img !== 'string' || img.trim().length === 0)) return false;
  
  return true;
};

export const sanitizeContentData = (content: any): Content | null => {
  try {
    if (!content) return null;
    
    const sanitized: Content = {
      id: String(content.id || ''),
      title: String(content.title || ''),
      description: String(content.description || ''),
      subtitle: content.subtitle ? String(content.subtitle) : undefined,
      subcontent: content.subcontent ? String(content.subcontent) : undefined,
      createdAt: content.createdAt ? new Date(content.createdAt) : new Date(),
      updatedAt: content.updatedAt ? new Date(content.updatedAt) : new Date(),
      coverUrl: String(content.coverUrl || ''),
      images: Array.isArray(content.images) ? content.images.map(String) : [],
      video: content.video ? String(content.video) : undefined,
      category: content.category || {id: '1', name: 'Unknown', auditable: false},
      isReposted: Boolean(content.isReposted),
      isLiked: Boolean(content.isLiked),
      likesCount: Number(content.likesCount || 0),
      repostsCount: Number(content.repostsCount || 0),
      authorId: String(content.authorId || ''),
      repostedFromContentId: content.repostedFromContentId ? String(content.repostedFromContentId) : undefined,
      repostedByUserId: content.repostedByUserId ? String(content.repostedByUserId) : undefined,
      commentsCount: Number(content.commentsCount || 0),
      comments: Array.isArray(content.comments) ? content.comments : [],
    };
    
    return validateContent(sanitized) ? sanitized : null;
  } catch {
    return null;
  }
};

export const sanitizeCategoriesData = (categories: any[]): ContentCategory[] => {
  try {
    if (!Array.isArray(categories)) return [];
    
    return categories.map(cat => ({
      id: String(cat.id || ''),
      name: String(cat.name || ''),
      auditable: Boolean(cat.auditable),
    })).filter(validateContentCategory);
  } catch {
    return [];
  }
};

