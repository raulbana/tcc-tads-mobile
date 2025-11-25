import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {NotificationData} from '../types/notification';

class NotificationService {
  private token: string | null = null;
  private onTokenRefreshCallback: ((token: string) => void) | null = null;
  private onNotificationOpenedCallback:
    | ((data: NotificationData | null) => void)
    | null = null;
  private onForegroundNotificationCallback:
    | ((remoteMessage: any) => void)
    | null = null;
  private isDeviceRegistered: boolean = false;

  /**
   * Inicializa o serviço de notificações
   * No iOS, registra o dispositivo para mensagens remotas
   */
  async initialize(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        console.log(
          '[NotificationService] Registrando dispositivo iOS para mensagens remotas...',
        );
        try {
          await messaging().registerDeviceForRemoteMessages();
          this.isDeviceRegistered = true;
          console.log(
            '[NotificationService] Dispositivo registrado com sucesso (iOS)',
          );
        } catch (error) {
          if (error instanceof Error) {
            // Se já estiver registrado, não é um erro
            if (
              error.message.includes('already registered') ||
              error.message.includes('registered')
            ) {
              this.isDeviceRegistered = true;
              console.log(
                '[NotificationService] Dispositivo já estava registrado (iOS)',
              );
            } else if (
              error.message.includes('aps-environment') ||
              error.message.includes('authorization code')
            ) {
              // Erro relacionado à configuração de Push Notifications no Xcode
              console.warn(
                '[NotificationService] ⚠️ AVISO: Push Notifications não configurado corretamente no Xcode.\n' +
                  'Por favor, siga as instruções em HABILITAR_PUSH_NOTIFICATIONS_IOS.md para configurar:\n' +
                  '1. Adicionar capability "Push Notifications" no Xcode\n' +
                  '2. Adicionar arquivo de entitlements ao projeto\n' +
                  '3. Configurar o provisioning profile com Push Notifications\n' +
                  'Erro original: ' +
                  error.message,
              );
              // Não marcar como registrado, mas não quebrar o app
              this.isDeviceRegistered = false;
            } else {
              console.error(
                '[NotificationService] Erro ao registrar dispositivo:',
                error,
              );
              // Não quebrar o app, apenas logar o erro
              this.isDeviceRegistered = false;
            }
          }
        }
      } else {
        // Android não precisa de registro explícito
        this.isDeviceRegistered = true;
      }
    } catch (error) {
      console.error('[NotificationService] Erro na inicialização:', error);
      // Não quebrar o app se houver erro na inicialização
    }
  }

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
        console.log(
          '[NotificationService] Versão do Android:',
          platformVersion,
        );
        if (platformVersion >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;

          return hasPermission;
        }
        return true;
      }
    } catch (error) {
      console.error(
        '[NotificationService] Erro ao solicitar permissão:',
        error,
      );
      if (error instanceof Error) {
        console.error('[NotificationService] Mensagem de erro:', error.message);
      }
      return false;
    }
  }

  async checkPermission(): Promise<boolean> {
    try {
      console.log(
        '[NotificationService] Verificando permissões de notificação...',
      );
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const hasPermission =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log('[NotificationService] Permissão iOS:', hasPermission);
        return hasPermission;
      } else {
        const platformVersion =
          typeof Platform.Version === 'string'
            ? parseInt(Platform.Version, 10)
            : Platform.Version;
        console.log(
          '[NotificationService] Versão do Android:',
          platformVersion,
        );
        if (platformVersion >= 33) {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log(
            '[NotificationService] Permissão Android (>=33):',
            granted,
          );
          return granted;
        }
        console.log(
          '[NotificationService] Android < 33, permissão concedida por padrão',
        );
        return true;
      }
    } catch (error) {
      console.error(
        '[NotificationService] Erro ao verificar permissão:',
        error,
      );
      if (error instanceof Error) {
        console.error('[NotificationService] Mensagem de erro:', error.message);
      }
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      console.log('[NotificationService] Tentando obter token FCM...');

      // No iOS, garantir que o dispositivo está registrado antes de obter o token
      if (Platform.OS === 'ios') {
        if (!this.isDeviceRegistered) {
          console.log(
            '[NotificationService] Dispositivo não registrado, registrando agora...',
          );
          await this.initialize();
        }

        // Garantir que o registro foi concluído antes de continuar
        if (!this.isDeviceRegistered) {
          console.warn(
            '[NotificationService] Aviso: Dispositivo ainda não registrado, tentando registrar novamente...',
          );
          try {
            await messaging().registerDeviceForRemoteMessages();
            this.isDeviceRegistered = true;
            console.log(
              '[NotificationService] Dispositivo registrado com sucesso',
            );
          } catch (registerError) {
            if (registerError instanceof Error) {
              // Ignorar se já estiver registrado
              if (
                registerError.message.includes('already registered') ||
                registerError.message.includes('registered')
              ) {
                this.isDeviceRegistered = true;
              } else {
                console.error(
                  '[NotificationService] Erro ao registrar dispositivo:',
                  registerError,
                );
                throw registerError;
              }
            }
          }
        }
      }

      const token = await messaging().getToken();
      this.token = token;
      if (token) {
        console.log('[NotificationService] Token FCM obtido com sucesso!');
        console.log('[NotificationService] Token:', token);
      } else {
        console.warn('[NotificationService] Token FCM é null ou vazio');
      }
      return token;
    } catch (error) {
      console.error('[NotificationService] Erro ao obter token FCM:', error);
      if (error instanceof Error) {
        console.error('[NotificationService] Mensagem de erro:', error.message);
        console.error('[NotificationService] Stack:', error.stack);
      }
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

  async displayLocalNotification(
    title: string,
    body: string,
    data?: NotificationData,
  ): Promise<void> {
    try {
      // Notifee exige que TODOS os valores em notification.data sejam strings
      // Converter todos os valores para string
      const notifeeData: {[key: string]: string} | undefined = data
        ? Object.keys(data).reduce((acc, key) => {
            const value = data[key];
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
          }, {} as {[key: string]: string})
        : undefined;

      if (Platform.OS === 'android') {
        const channelId = await notifee.createChannel({
          id: 'dailyiu-default',
          name: 'DailyIU Notificações',
          importance: AndroidImportance.HIGH,
          sound: 'default',
          vibration: true,
        });

        await notifee.displayNotification({
          title,
          body,
          data: notifeeData,
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
            sound: 'default',
          },
        });

        console.log('[NotificationService] Notificação local exibida:', {
          title,
          body,
          channelId,
        });
      } else {
        await notifee.displayNotification({
          title,
          body,
          data: notifeeData,
          ios: {
            sound: 'default',
          },
        });

        console.log('[NotificationService] Notificação local exibida (iOS):', {
          title,
          body,
        });
      }
    } catch (error) {
      console.error(
        '[NotificationService] Erro ao exibir notificação local:',
        error,
      );
      if (error instanceof Error) {
        console.error('[NotificationService] Mensagem:', error.message);
      }
    }
  }

  onForegroundMessage(callback: (remoteMessage: any) => void): () => void {
    this.onForegroundNotificationCallback = callback;
    return messaging().onMessage(async remoteMessage => {
      console.log(
        '[NotificationService] Notificação recebida em foreground:',
        remoteMessage,
      );

      const title = remoteMessage.notification?.title || 'DailyIU';
      const body = remoteMessage.notification?.body || '';
      const data = remoteMessage.data as NotificationData | undefined;

      await this.displayLocalNotification(title, body, data);
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
