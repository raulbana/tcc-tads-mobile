import axios from "axios";
import {BASE_URL} from "@env"
import apiRoutes from "../../../utils/apiRoutes";
import { Question } from "../../../types/question";

const apiInstance = axios.create(
    {
      baseURL: BASE_URL,
    }
);

const onboardingServices = {
  getQuestions: async () : Promise<Question[]> => {
      const response = await apiInstance.get(apiRoutes.onboarding.questions.onboarding);
      return response.data;
  }
}

export default onboardingServices;