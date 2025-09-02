import apiRoutes from '../../../utils/apiRoutes';
import { Question } from '../../../types/question';
import { BASE_URL } from '@env';
import apiFactory from '../../../services/apiFactory'

const apiInstance = apiFactory(BASE_URL);

const onboardingServices = {
  getQuestions: async (): Promise<Question[]> => {
    const response = await apiInstance.get(apiRoutes.onboarding.questions.onboarding);
    return response.data;
  },
};

export default onboardingServices;
