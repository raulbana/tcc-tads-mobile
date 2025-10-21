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
    like: (contentId: string) => `/content/${contentId}/like`,
    repost: (contentId: string) => `/content/${contentId}/repost`,
    report: (contentId: string) => `/content/${contentId}/report`,
    categories: '/content-categories',
  },
  comment: {
    create: '/comment',
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
