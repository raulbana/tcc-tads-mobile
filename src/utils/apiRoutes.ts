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
    all: '/contents',
    category: '/contents/category',
    byId: (contentId: string) => `/contents/${contentId}`,
    create: '/contents',
  },
  diary: {
    calendar: '/calendar',
  },
};

export default apiRoutes;
