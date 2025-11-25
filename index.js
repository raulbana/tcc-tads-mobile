/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

console.log('[index.js] Inicializando app...');
console.log('[index.js] Firebase app importado');

// Registrar dispositivo iOS para mensagens remotas ANTES de qualquer outra coisa
// Isso é CRÍTICO para evitar o erro [messaging/unregistered]
if (Platform.OS === 'ios') {
  messaging()
    .registerDeviceForRemoteMessages()
    .then(() => {
      console.log('[index.js] ✅ Dispositivo iOS registrado para mensagens remotas');
    })
    .catch(error => {
      if (error?.message && 
          (error.message.includes('already registered') || 
           error.message.includes('registered'))) {
        console.log('[index.js] ℹ️  Dispositivo iOS já estava registrado');
      } else {
        console.warn('[index.js] ⚠️  Aviso ao registrar dispositivo iOS:', error?.message || error);
      }
    });
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[index.js] Message handled in the background!', remoteMessage);

  const title = remoteMessage.notification?.title || 'DailyIU';
  const body = remoteMessage.notification?.body || '';
  const remoteData = remoteMessage.data;

  // Notifee exige que TODOS os valores em notification.data sejam strings
  // Converter todos os valores para string
  const notifeeData = remoteData
      ? Object.keys(remoteData).reduce((acc, key) => {
        const value = remoteData[key];
        // Converter qualquer valor para string
        if (value !== undefined && value !== null) {
          if (typeof value === 'string') {
            acc[key] = value;
          } else if (typeof value === 'number') {
            acc[key] = String(value);
          } else if (typeof value === 'boolean') {
            acc[key] = String(value);
          } else if (typeof value === 'object') {
            // Para objetos, converter para JSON string
            acc[key] = JSON.stringify(value);
          } else {
            // Qualquer outro tipo, converter para string
            acc[key] = String(value);
          }
        }
        return acc;
      }, {})
    : undefined;

  const channelId = await notifee.createChannel({
    id: 'dailyiu-default',
    name: 'DailyIU Notificações',
    importance: 4, // AndroidImportance.HIGH
    sound: 'default',
    vibration: true,
  });

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

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('[index.js] Notifee background event (app fechado):', type, detail);
  if (type === EventType.PRESS) {
    const notification = detail.notification;
    if (notification?.data) {
      try {
        const data = notification.data;
        console.log('[index.js] Dados da notificação:', data);
      } catch (error) {
        console.error('[index.js] Erro ao processar dados da notificação:', error);
      }
    }
  }
});

console.log('[index.js] Background message handler registrado');
console.log('[index.js] Registrando componente:', appName);

AppRegistry.registerComponent(appName, () => App);
