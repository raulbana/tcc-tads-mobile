export interface AuthorDTO {
  id: number;
  name: string;
  profilePicture?: string;
}

export interface MediaDTO {
  url: string;
  contentType: string;
  contentSize: number;
  altText: string;
  createdAt: string;
}

export interface CommentDTO {
  id: number;
  author: AuthorDTO;
  text: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked: boolean;
  repliesCount: number;
}

export interface CommentCreatorDTO {
  contentId: number;
  authorId: number;
  text: string;
  replyToCommentId?: number;
}

export interface ContentCategoryDTO {
  id: number;
  name: string;
  description: string;
  auditable: boolean;
  createdAt: string;
}

export interface ContentCategory {
  id: string;
  name: string;
  auditable: boolean;
}

export interface Comment {
  id: string;
  contentId: string;
  text: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount?: number;
  isLikedByCurrentUser?: boolean;
  repliesCount?: number;
  replies?: Comment[];
}

export interface Content {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  subcontent?: string;
  createdAt: Date;
  updatedAt: Date;
  cover: {
    url: string;
    id: number;
    contentType: string;
    contentSize: number;
    altText: string;
    createdAt: Date;
  };
  media: MediaDTO[];
  categories: string[];
  isReposted?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  likesCount?: number;
  repostsCount?: number;
  authorId: string;
  repostedFromContentId?: string;
  repostedByUserId?: string;
  commentsCount: number;
  comments: Comment[];
}

export interface ContentSimpleDTO {
  id: number;
  title: string;
  category: string;
  author: AuthorDTO;
  cover: MediaDTO;
  isReposted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentUpdateDTO {
  title: string;
  description: string;
  subtitle?: string;
  subcontent?: string;
  media: MediaDTO[];
}

export interface ToggleDTO {
  userId: number;
  control: boolean;
}

export interface CreateContentRequest {
  title: string;
  description: string;
  subtitle?: string;
  subcontent?: string;
  categories: string[];
  images?: string[];
  video?: string;
}

export interface UpdateContentRequest {
  title?: string;
  description?: string;
  subtitle?: string;
  subcontent?: string;
  categories?: string[];
  images?: string[];
  video?: string;
}

export interface ReportContentDTO {
  reporterId: number;
  reason: string;
}

export interface ContentFilters {
  categoryId?: number;
  authorId?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ContentStats {
  totalContents: number;
  totalCategories: number;
  totalComments: number;
  totalLikes: number;
}
