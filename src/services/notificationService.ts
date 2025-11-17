import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {NotificationPayload, NotificationData} from '../types/notification';

class NotificationService {
  private token: string | null = null;
  private onTokenRefreshCallback: ((token: string) => void) | null = null;
  private onNotificationOpenedCallback:
    | ((data: NotificationData | null) => void)
    | null = null;
  private onForegroundNotificationCallback:
    | ((remoteMessage: any) => void)
    | null = null;

  async requestPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        return enabled;
      } else {
        const platformVersion =
          typeof Platform.Version === 'string'
            ? parseInt(Platform.Version, 10)
            : Platform.Version;
        if (platformVersion >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  async checkPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        return (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
      } else {
        const platformVersion =
          typeof Platform.Version === 'string'
            ? parseInt(Platform.Version, 10)
            : Platform.Version;
        if (platformVersion >= 33) {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          return granted;
        }
        return true;
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      this.token = token;
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  async deleteToken(): Promise<void> {
    try {
      await messaging().deleteToken();
      this.token = null;
    } catch (error) {
      console.error('Error deleting FCM token:', error);
    }
  }

  onTokenRefresh(callback: (token: string) => void): () => void {
    this.onTokenRefreshCallback = callback;
    return messaging().onTokenRefresh(token => {
      this.token = token;
      callback(token);
    });
  }

  onNotificationOpenedApp(
    callback: (data: NotificationData | null) => void,
  ): () => void {
    this.onNotificationOpenedCallback = callback;
    return messaging().onNotificationOpenedApp(remoteMessage => {
      const data = remoteMessage.data as NotificationData | undefined;
      callback(data || null);
    });
  }

  async getInitialNotification(): Promise<NotificationData | null> {
    try {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        return (remoteMessage.data as NotificationData) || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting initial notification:', error);
      return null;
    }
  }

  onForegroundMessage(callback: (remoteMessage: any) => void): () => void {
    this.onForegroundNotificationCallback = callback;
    return messaging().onMessage(async remoteMessage => {
      callback(remoteMessage);
    });
  }

  setBackgroundMessageHandler(): void {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }

  getCurrentToken(): string | null {
    return this.token;
  }
}

export default new NotificationService();
