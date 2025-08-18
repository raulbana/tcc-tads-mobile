import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import { CalendarRangeResponse } from '../../../types/diary';

const api = apiFactory(BASE_URL);


const diaryServices = {
  getByRange: async (from: Date, to: Date): Promise<CalendarRangeResponse> => {
    const res = await api.get(`/calendar?from=${from.toISOString()}&to=${to.toISOString()}`);
    return res.data as CalendarRangeResponse;
  },

  getCurrentMonth: async (): Promise<CalendarRangeResponse> => {
    const res = await api.get(`/calendar/current-month`);
    return res.data as CalendarRangeResponse;
  }
}

export default diaryServices;