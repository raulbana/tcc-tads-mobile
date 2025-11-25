import {useState, useEffect, useCallback} from 'react';
import notificationService from '../services/notificationService';
import {MMKVStorage, NOTIFICATION_PERMISSION_MODAL_SHOWN_KEY} from '../storage/mmkvStorage';

export const useNotificationPermissionModal = () => {
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = useCallback(async () => {
    try {
      const permission = await notificationService.checkPermission();
      setHasPermission(permission);
      return permission;
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      return false;
    }
  }, []);

  const shouldShowModal = useCallback(async () => {
    try {
      const alreadyShown = MMKVStorage.getBoolean(NOTIFICATION_PERMISSION_MODAL_SHOWN_KEY);
      if (alreadyShown) {
        return false;
      }

      const hasPermission = await checkPermission();
      if (hasPermission) {
        MMKVStorage.set(NOTIFICATION_PERMISSION_MODAL_SHOWN_KEY, true);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao verificar se deve exibir modal:', error);
      return false;
    }
  }, [checkPermission]);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
    MMKVStorage.set(NOTIFICATION_PERMISSION_MODAL_SHOWN_KEY, true);
  }, []);

  const checkAndShowIfNeeded = useCallback(async () => {
    const shouldShow = await shouldShowModal();
    if (shouldShow) {
      setVisible(true);
    }
  }, [shouldShowModal]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    visible,
    hasPermission,
    showModal,
    hideModal,
    checkAndShowIfNeeded,
    checkPermission,
  };
};

