import {MMKV} from 'react-native-mmkv';
export const MMKVStorage = new MMKV({
  id: 'daily_iu_app_storage',
});

export const ANON_USER_KEY = 'anon_user_v1';
export const MMKV_CACHE_USER_KEY = 'cache_user_v1';
export const REMEMBER_ME_KEY = 'remember_me_v1';

export const DIARY_CALENDAR_KEY = 'diary_calendar_v1';
export const EXERCISES_DATA_KEY = 'exercises_data_v1';
export const ONBOARDING_DATA_KEY = 'onboarding_data_v1';
export const ONBOARDING_PROFILE_DTO_KEY = 'onboarding_profile_dto_v1';
export const ONBOARDING_URINATION_LOSS_KEY = 'onboarding_urination_loss_v1';
export const ONBOARDING_WORKOUT_PLAN_KEY = 'onboarding_workout_plan_v1';
export const PENDING_REGISTER_KEY = 'pending_register_v1';
export const NOTIFICATION_PERMISSION_MODAL_SHOWN_KEY =
  'notification_permission_modal_shown_v1';
export const EXERCISES_BLOCKED_KEY = 'exercises_blocked_v1';
