const apiRoutes = {
  authentication: {
    login: '/users/login',
    register: '/users',
    updateUser: '/users',
    getUserById: (id: number) => `/users/${id}`,
    forgotPasswordRequest: '/users/password/forgot',
    forgotPasswordReset: '/users/password/reset',
  },
  onboarding: {
    questions: {
      onboarding: '/questions/onboard',
    },
  },
  content: {
    all: '/content',
    byId: (contentId: string) => `/content/${contentId}`,
    create: '/content',
    update: (contentId: string) => `/content/${contentId}`,
    delete: (contentId: string) => `/content/${contentId}`,
    like: (contentId: string) => `/content/${contentId}`,
    repost: (contentId: string) => `/content/repost/${contentId}`,
    report: (contentId: string) => `/content/${contentId}/report`,
    save: (contentId: string) => `/content/${contentId}/save`,
    categories: '/content/category',
    user: (userId: string) => `/content?userId=${userId}`,
    saved: (userId: string) => `/content/saved/${userId}`,
    comments: (contentId: string) => `/content/comments/${contentId}`,
    comment: (commentId: string) => `/content/comments/${commentId}`,
    commentLike: (commentId: string) => `/content/comments/${commentId}`,
    commentReplies: (commentId: string) =>
      `/content/comments/${commentId}/replies`,
  },
  media: {
    upload: '/media/upload',
  },
  diary: {
    calendar: '/calendar',
  },
  config: {
    contact: {
      support: '/contact/support',
    },
    preferences: {
      accessibility: '/preferences/accessibility',
    },
  },
};

export default apiRoutes;
