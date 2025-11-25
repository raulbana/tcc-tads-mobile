import {useState, useEffect, useCallback} from 'react';
import notificationService from '../services/notificationService';
import notificationApiService from '../services/notificationApiService';

interface UseNotificationsReturn {
  hasPermission: boolean;
  fcmToken: string | null;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  registerToken: (userId: number) => Promise<void>;
  removeToken: (userId: number) => Promise<void>;
}

const useNotifications = (): UseNotificationsReturn => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkPermission = useCallback(async () => {
    try {
      const permission = await notificationService.checkPermission();
      setHasPermission(permission);
      return permission;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const granted = await notificationService.requestPermission();
      setHasPermission(granted);

      if (granted) {
        const token = await notificationService.getToken();
        setFcmToken(token);
      }

      return granted;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerToken = useCallback(async (userId: number) => {
    try {
      const token = await notificationService.getToken();
      if (token) {
        setFcmToken(token);
        await notificationApiService.registerToken(token, userId);
      }
    } catch (error) {
      console.error('Error registering token:', error);
    }
  }, []);

  const removeToken = useCallback(async (userId: number) => {
    try {
      await notificationApiService.removeToken(userId);
      await notificationService.deleteToken();
      setFcmToken(null);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        const permission = await checkPermission();
        if (permission) {
          const token = await notificationService.getToken();
          setFcmToken(token);
        }
      } catch (error) {
        console.error('Error initializing notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

    const unsubscribeTokenRefresh = notificationService.onTokenRefresh(
      async token => {
        setFcmToken(token);
      },
    );

    return () => {
      unsubscribeTokenRefresh();
    };
  }, [checkPermission]);

  return {
    hasPermission,
    fcmToken,
    isLoading,
    requestPermission,
    registerToken,
    removeToken,
  };
};

export default useNotifications;
