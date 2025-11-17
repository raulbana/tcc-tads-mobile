import React, {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import notificationService from '../../services/notificationService';
import {NotificationData} from '../../types/notification';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../navigation/routes';

interface NotificationHandlerProps {
  onNotificationPress?: (data: NotificationData | null) => void;
}

const NotificationHandler: React.FC<NotificationHandlerProps> = ({
  onNotificationPress,
}) => {
  const navigation = useNavigation<NavigationStackProp>();
  const navigationRef = useRef(navigation);

  useEffect(() => {
    navigationRef.current = navigation;
  }, [navigation]);

  useEffect(() => {
    // Handle notification when app is opened from notification
    const handleInitialNotification = async () => {
      const initialNotification =
        await notificationService.getInitialNotification();
      if (initialNotification && onNotificationPress) {
        onNotificationPress(initialNotification);
      } else if (initialNotification) {
        handleNotificationNavigation(initialNotification);
      }
    };

    // Delay to ensure navigation is ready
    const timer = setTimeout(() => {
      handleInitialNotification();
    }, 1000);

    // Handle notification when app is opened from background
    const unsubscribeOpenedApp = notificationService.onNotificationOpenedApp(
      data => {
        if (onNotificationPress) {
          onNotificationPress(data);
        } else {
          handleNotificationNavigation(data);
        }
      },
    );

    // Handle foreground notifications
    const unsubscribeForeground = notificationService.onForegroundMessage(
      async remoteMessage => {
        // You can show a local notification or toast here
        console.log('Foreground notification received:', remoteMessage);

        // Optionally show a local notification
        if (Platform.OS === 'android') {
          // Android handles foreground notifications automatically
        } else {
          // iOS may need local notification for foreground
        }
      },
    );

    return () => {
      clearTimeout(timer);
      unsubscribeOpenedApp();
      unsubscribeForeground();
    };
  }, [onNotificationPress]);

  const handleNotificationNavigation = (data: NotificationData | null) => {
    if (!data) return;

    try {
      switch (data.type) {
        case 'comment':
        case 'reply':
          if (data.contentId) {
            navigationRef.current?.navigate('Content', {
                screen: 'ContentDetails',
                params: {
                  contentId: data.contentId,
                },
            });
          }
          break;
        case 'like':
          if (data.contentId) {
            navigationRef.current?.navigate('Content', {
              screen: 'ContentDetails',
              params: {
              contentId: data.contentId,
              },
              },
            );
          }
          break;
        default:
          navigationRef.current?.navigate('MainTabs');
          break;
      }
    } catch (error) {
      console.error('Error navigating from notification:', error);
    }
  };

  return null;
};

export default NotificationHandler;
