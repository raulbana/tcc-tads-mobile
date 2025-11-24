import React, {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
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
    // A exibição da notificação local já é feita dentro do notificationService.onForegroundMessage
    const unsubscribeForeground = notificationService.onForegroundMessage(
      async remoteMessage => {
        console.log(
          '[NotificationHandler] Foreground notification received:',
          remoteMessage,
        );
        // A notificação local já foi exibida pelo notificationService
        // Aqui você pode adicionar lógica adicional se necessário
      },
    );

    // Handle quando o usuário toca em uma notificação local (do notifee) com app em foreground
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
            // O data já é um objeto, não precisa fazer parse
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
