import apiRoutes from '../../../utils/apiRoutes';
import {Question} from '../../../types/question';
import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import {OnboardSubmitDTO, OnboardCompleteDTO} from '../../../types/onboarding';

const apiInstance = apiFactory(BASE_URL);

const onboardingServices = {
  getQuestions: async (): Promise<Question[]> => {
    const response = await apiInstance.get(
      apiRoutes.onboarding.questions.onboarding,
    );
    return response.data;
  },
  submitAnswers: async (
    data: OnboardSubmitDTO,
  ): Promise<OnboardCompleteDTO> => {
    const response = await apiInstance.post(
      apiRoutes.onboarding.questions.submit,
      data,
    );
    return response.data;
  },
};

export default onboardingServices;
