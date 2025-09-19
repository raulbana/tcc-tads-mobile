const apiRoutes = {
  authentication: {
    login: '/auth/login',
    register: '/auth/register',
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
  },
};

export default apiRoutes;
