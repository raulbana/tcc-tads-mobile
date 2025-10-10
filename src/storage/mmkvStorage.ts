import {MMKV} from 'react-native-mmkv';
export const MMKVStorage = new MMKV({
  id: 'daily_iu_app_storage',
});

export const ANON_USER_KEY = 'anon_user_v1';
export const MMKV_CACHE_USER_KEY = 'cache_user_v1';