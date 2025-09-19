import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncSet = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn('AsyncStorage.set error', key, e);
  }
};

export const asyncGet = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.warn('AsyncStorage.get error', key, e);
    return null;
  }
};

export const asyncRemove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('AsyncStorage.remove error', key, e);
  }
};
