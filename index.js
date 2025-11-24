/**
 * @format
 */

import {AppRegistry} from 'react-native';
import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

console.log('[index.js] Inicializando app...');
console.log('[index.js] Firebase app importado');

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[index.js] Message handled in the background!', remoteMessage);
  
  // Exibir notificação local quando o app está em background
  const title = remoteMessage.notification?.title || 'DailyIU';
  const body = remoteMessage.notification?.body || '';
  const remoteData = remoteMessage.data;

  // Converter data para o formato esperado pelo notifee
  // O notifee espera { [key: string]: string | number | object }
  const notifeeData = remoteData
    ? Object.keys(remoteData).reduce((acc, key) => {
        const value = remoteData[key];
        // Garantir que os valores sejam string, number ou object
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'object') {
          acc[key] = value;
        } else {
          acc[key] = String(value);
        }
        return acc;
      }, {})
    : undefined;

  // Criar canal de notificação para Android
  const channelId = await notifee.createChannel({
    id: 'dailyiu-default',
    name: 'DailyIU Notificações',
    importance: 4, // AndroidImportance.HIGH
    sound: 'default',
    vibration: true,
  });

  // Exibir notificação local
  await notifee.displayNotification({
    title,
    body,
    data: notifeeData,
    android: {
      channelId,
      importance: 4, // AndroidImportance.HIGH
      pressAction: {
        id: 'default',
      },
      sound: 'default',
    },
  });
});

// Handle quando o usuário toca em uma notificação com o app completamente fechado
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('[index.js] Notifee background event (app fechado):', type, detail);
  if (type === EventType.PRESS) {
    const notification = detail.notification;
    if (notification?.data) {
      try {
        // O data já é um objeto, não precisa fazer parse
        const data = notification.data;
        console.log('[index.js] Dados da notificação:', data);
        // A navegação será tratada quando o app abrir
      } catch (error) {
        console.error('[index.js] Erro ao processar dados da notificação:', error);
      }
    }
  }
});

console.log('[index.js] Background message handler registrado');
console.log('[index.js] Registrando componente:', appName);

AppRegistry.registerComponent(appName, () => App);
