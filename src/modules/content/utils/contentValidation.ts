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


