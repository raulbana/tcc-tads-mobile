import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {Content, ContentCategory} from '../../../types/content';

const mockContents: Content[] = [
  {
    id: '1',
    title: 'Content 1',
    description: 'Description for content 1',
    subtitle: 'Subtitle for content 1',
    subcontent:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date(),
    updatedAt: new Date(),
    coverUrl: 'https://picsum.photos/300/300',
    images: [
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
    ],
    category: {
      id: '1',
      name: 'Fitness',
      auditable: false,
    },
    authorId: '123',
    commentsCount: 1,
    comments: [
      {
        id: 'c1',
        contentId: '1',
        text: 'Great content!',
        authorId: 'u1',
        authorName: 'User 1',
        authorImage: 'https://picsum.photos/300/300',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: '2',
    title: 'Content 2',
    subtitle: 'Subtitle for content 2',
    subcontent:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    description: 'Description for content 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    coverUrl: 'https://picsum.photos/300/300',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
    ],
    category: {id: '2', name: 'Nutrition', auditable: false},
    authorId: '456',
    commentsCount: 1,
    comments: [
      {
        id: 'c1',
        contentId: '1',
        text: 'Great content!',
        authorId: 'u1',
        authorName: 'User 1',
        authorImage: 'https://picsum.photos/300/300',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c2',
        contentId: '1',
        text: 'Thanks for sharing!',
        authorId: 'u2',
        authorName: 'User 2',
        authorImage: 'https://picsum.photos/300/300',
        createdAt: new Date(),
        updatedAt: new Date(),
        repliesCount: 1,
        replies: [
          {
            id: 'c3',
            contentId: '1',
            text: 'You are welcome!',
            authorId: 'u1',
            authorName: 'User 1',
            authorImage: 'https://picsum.photos/300/300',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'c4',
            contentId: '2',
            text: 'You are welcome!',
            authorId: 'u1',
            authorName: 'User 1',
            authorImage: 'https://picsum.photos/300/300',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'c5',
            contentId: '3',
            text: 'You are welcome!',
            authorId: 'u1',
            authorName: 'User 1',
            authorImage: 'https://picsum.photos/300/300',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ],
  },
];

const api = apiFactory(BASE_URL);

const contentServices = {
  getById: async (contentId: string): Promise<Content> => {
    const response = await api.get(`/contents/${contentId}`);
    return response.data; 
  },

  getAll: async (): Promise<Content[]> => {
    const response = await api.get('/contents');
    return mockContents;
  },

  getCategories: async (): Promise<ContentCategory[]> => {
    const response = await api.get('/contents/categories');
    return response.data;
  },

  createContent: async (contentData: {
    title: string;
    description: string;
    images: string[];
    video?: string;
    categories: string[];
  }): Promise<Content> => {
    const formData = new FormData();
    
    formData.append('title', contentData.title);
    formData.append('description', contentData.description);
    formData.append('categories', JSON.stringify(contentData.categories));

    contentData.images.forEach((imageUri, index) => {
      const filename = imageUri.split('/').pop() || `image_${index}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('images', {
        uri: imageUri,
        name: filename,
        type: type,
      } as any);
    });

    if (contentData.video) {
      const filename = contentData.video.split('/').pop() || 'video.mp4';
      formData.append('video', {
        uri: contentData.video,
        name: filename,
        type: 'video/mp4',
      } as any);
    }

    const response = await api.post('/contents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export default contentServices;
