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
      submit: '/questions/onboard',
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
    saved: '/content/saved',
    comments: (contentId: string) => `/content/comments/${contentId}`,
    createComment: '/content/comments',
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
    report: '/report',
  },
  exercises: {
    getExerciseById: (id: string) => `/exercise/${id}`,
    getUserWorkoutPlan: '/users/workout/plan',
    submitWorkoutFeedback: '/users/workout/feedback',
    submitWorkoutCompletion: '/users/workout/completion',
  },
  config: {
    contact: {
      support: '/contact/support',
    },
    preferences: {
      accessibility: '/preferences/accessibility',
    },
    editProfile: (id: number) => `/users/${id}`,
  },
  notifications: {
    register: '/notifications/token',
    update: '/notifications/token',
    remove: '/notifications/token',
  },
};

export default apiRoutes;
