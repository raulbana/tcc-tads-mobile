import React, {useEffect, useRef} from 'react';
import notifee, {EventType} from '@notifee/react-native';
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
    const handleInitialNotification = async () => {
      const initialNotification =
        await notificationService.getInitialNotification();
      if (initialNotification && onNotificationPress) {
        onNotificationPress(initialNotification);
      } else if (initialNotification) {
        handleNotificationNavigation(initialNotification);
      }
    };

    const timer = setTimeout(() => {
      handleInitialNotification();
    }, 1000);

    const unsubscribeOpenedApp = notificationService.onNotificationOpenedApp(
      data => {
        if (onNotificationPress) {
          onNotificationPress(data);
        } else {
          handleNotificationNavigation(data);
        }
      },
    );

    const unsubscribeForeground = notificationService.onForegroundMessage(
      async remoteMessage => {
        console.log(
          '[NotificationHandler] Foreground notification received:',
          remoteMessage,
        );
      },
    );

    const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
      console.log(
        '[NotificationHandler] Notifee foreground event:',
        type,
        detail,
      );
      if (type === EventType.PRESS) {
        const notification = detail.notification;
        if (notification?.data) {
          try {
            const data = notification.data as NotificationData;
            if (onNotificationPress) {
              onNotificationPress(data);
            } else {
              handleNotificationNavigation(data);
            }
          } catch (error) {
            console.error(
              '[NotificationHandler] Erro ao processar dados da notificação:',
              error,
            );
          }
        }
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribeOpenedApp();
      unsubscribeForeground();
      unsubscribeNotifee();
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
            });
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
