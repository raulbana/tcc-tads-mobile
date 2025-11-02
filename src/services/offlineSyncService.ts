import {
  MMKVStorage,
  DIARY_CALENDAR_KEY,
  EXERCISES_DATA_KEY,
  ONBOARDING_DATA_KEY,
} from '../storage/mmkvStorage';
import diaryServices from '../modules/diary/services/diaryServices';
import {CalendarRangeResponse} from '../types/diary';
import {PatientProfile} from '../types/auth';
import {Exercise} from '../types/exercise';

export interface OfflineData {
  diaryCalendar?: CalendarRangeResponse;
  exercises?: Exercise[];
  onboarding?: PatientProfile;
}

class OfflineSyncService {
  saveOnboardingData(profile: PatientProfile): void {
    try {
      MMKVStorage.set(ONBOARDING_DATA_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Erro ao salvar dados de onboarding no MMKV:', error);
    }
  }

  getOnboardingData(): PatientProfile | null {
    try {
      const data = MMKVStorage.getString(ONBOARDING_DATA_KEY);
      return data ? (JSON.parse(data) as PatientProfile) : null;
    } catch (error) {
      console.error('Erro ao obter dados de onboarding do MMKV:', error);
      return null;
    }
  }

  saveExercisesData(exercises: Exercise[]): void {
    try {
      MMKVStorage.set(EXERCISES_DATA_KEY, JSON.stringify(exercises));
    } catch (error) {
      console.error('Erro ao salvar dados de exercícios no MMKV:', error);
    }
  }

  getExercisesData(): Exercise[] {
    try {
      const data = MMKVStorage.getString(EXERCISES_DATA_KEY);
      return data ? (JSON.parse(data) as Exercise[]) : [];
    } catch (error) {
      console.error('Erro ao obter dados de exercícios do MMKV:', error);
      return [];
    }
  }

  getAllOfflineData(): OfflineData {
    return {
      diaryCalendar: this.getDiaryCalendarData(),
      exercises: this.getExercisesData(),
      onboarding: this.getOnboardingData() ?? undefined,
    };
  }

  getDiaryCalendarData(): CalendarRangeResponse {
    try {
      const data = MMKVStorage.getString(DIARY_CALENDAR_KEY);
      return data ? (JSON.parse(data) as CalendarRangeResponse) : {};
    } catch (error) {
      console.error('Erro ao obter dados do calendário do MMKV:', error);
      return {};
    }
  }

  async syncAllOfflineData(userId: string): Promise<void> {
    try {
      await diaryServices.syncOfflineData(userId);
    } catch (error) {
      console.error('Erro ao sincronizar dados offline:', error);
      throw error;
    }
  }

  clearAllOfflineData(): void {
    try {
      MMKVStorage.delete(DIARY_CALENDAR_KEY);
      MMKVStorage.delete(EXERCISES_DATA_KEY);
      MMKVStorage.delete(ONBOARDING_DATA_KEY);
    } catch (error) {
      console.error('Erro ao limpar dados offline:', error);
    }
  }

  hasOfflineData(): boolean {
    return !!(
      MMKVStorage.getString(DIARY_CALENDAR_KEY) ||
      MMKVStorage.getString(EXERCISES_DATA_KEY) ||
      MMKVStorage.getString(ONBOARDING_DATA_KEY)
    );
  }
}

export default new OfflineSyncService();
