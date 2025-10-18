import {BASE_URL} from '@env';
import apiFactory from '../../../services/apiFactory';
import apiRoutes from '../../../utils/apiRoutes';
import { CalendarRangeResponse, CalendarRequestDTO, CalendarDayDTO } from '../../../types/diary';

const api = apiFactory(BASE_URL);

const diaryServices = {
  getCalendarEvents: async (from?: string, to?: string): Promise<CalendarRangeResponse> => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    
    const queryString = params.toString();
    const url = `${apiRoutes.diary.calendar}${queryString ? `?${queryString}` : ''}`;
    
    const res = await api.get(url);
    return res.data as CalendarRangeResponse;
  },

  setCalendarEvent: async (data: CalendarRequestDTO): Promise<CalendarDayDTO> => {
    const res = await api.put(apiRoutes.diary.calendar, data);
    return res.data as CalendarDayDTO;
  }
};

export default diaryServices;