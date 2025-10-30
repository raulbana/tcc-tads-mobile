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
  // Salvar dados de onboarding no MMKV
  saveOnboardingData(profile: PatientProfile): void {
    try {
      MMKVStorage.set(ONBOARDING_DATA_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Erro ao salvar dados de onboarding no MMKV:', error);
    }
  }

  // Obter dados de onboarding do MMKV
  getOnboardingData(): PatientProfile | null {
    try {
      const data = MMKVStorage.getString(ONBOARDING_DATA_KEY);
      return data ? (JSON.parse(data) as PatientProfile) : null;
    } catch (error) {
      console.error('Erro ao obter dados de onboarding do MMKV:', error);
      return null;
    }
  }

  // Salvar dados de exercícios no MMKV
  saveExercisesData(exercises: Exercise[]): void {
    try {
      MMKVStorage.set(EXERCISES_DATA_KEY, JSON.stringify(exercises));
    } catch (error) {
      console.error('Erro ao salvar dados de exercícios no MMKV:', error);
    }
  }

  // Obter dados de exercícios do MMKV
  getExercisesData(): Exercise[] {
    try {
      const data = MMKVStorage.getString(EXERCISES_DATA_KEY);
      return data ? (JSON.parse(data) as Exercise[]) : [];
    } catch (error) {
      console.error('Erro ao obter dados de exercícios do MMKV:', error);
      return [];
    }
  }

  // Obter todos os dados offline
  getAllOfflineData(): OfflineData {
    return {
      diaryCalendar: this.getDiaryCalendarData(),
      exercises: this.getExercisesData(),
      onboarding: this.getOnboardingData() ?? undefined,
    };
  }

  // Obter dados do calendário do MMKV
  getDiaryCalendarData(): CalendarRangeResponse {
    try {
      const data = MMKVStorage.getString(DIARY_CALENDAR_KEY);
      return data ? (JSON.parse(data) as CalendarRangeResponse) : {};
    } catch (error) {
      console.error('Erro ao obter dados do calendário do MMKV:', error);
      return {};
    }
  }

  // Sincronizar todos os dados offline com a API após login/cadastro
  async syncAllOfflineData(userId: string): Promise<void> {
    try {
      // Sincronizar dados do calendário
      await diaryServices.syncOfflineData(userId);

      // TODO: Implementar sincronização de exercícios quando a API estiver disponível
      // const exercises = this.getExercisesData();
      // if (exercises.length > 0) {
      //   await exerciseServices.syncOfflineData(userId, exercises);
      //   MMKVStorage.delete(EXERCISES_DATA_KEY);
      // }

      // TODO: Implementar sincronização de onboarding quando a API estiver disponível
      // const onboarding = this.getOnboardingData();
      // if (onboarding) {
      //   await onboardingServices.syncOfflineData(userId, onboarding);
      //   MMKVStorage.delete(ONBOARDING_DATA_KEY);
      // }

      console.log('Sincronização de dados offline concluída');
    } catch (error) {
      console.error('Erro ao sincronizar dados offline:', error);
      throw error;
    }
  }

  // Limpar todos os dados offline
  clearAllOfflineData(): void {
    try {
      MMKVStorage.delete(DIARY_CALENDAR_KEY);
      MMKVStorage.delete(EXERCISES_DATA_KEY);
      MMKVStorage.delete(ONBOARDING_DATA_KEY);
    } catch (error) {
      console.error('Erro ao limpar dados offline:', error);
    }
  }

  // Verificar se há dados offline para sincronizar
  hasOfflineData(): boolean {
    return !!(
      MMKVStorage.getString(DIARY_CALENDAR_KEY) ||
      MMKVStorage.getString(EXERCISES_DATA_KEY) ||
      MMKVStorage.getString(ONBOARDING_DATA_KEY)
    );
  }
}

export default new OfflineSyncService();
