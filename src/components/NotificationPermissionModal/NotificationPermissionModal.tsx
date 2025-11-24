import React from 'react';
import {Linking, Platform} from 'react-native';
import DialogModal, {DialogModalButton} from '../DialogModal/DialogModal';

interface NotificationPermissionModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationPermissionModal: React.FC<NotificationPermissionModalProps> = ({
  visible,
  onClose,
}) => {
  const handleOpenSettings = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
      onClose();
    } catch (error) {
      console.error('Erro ao abrir configurações:', error);
    }
  };

  const secondaryButton: DialogModalButton = {
    label: 'Agora não',
    onPress: onClose,
    type: 'SECONDARY',
  };

  const primaryButton: DialogModalButton = {
    label: 'Abrir Configurações',
    onPress: handleOpenSettings,
    type: 'PRIMARY',
  };

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      title="Permissão de Notificações"
      description="Para receber notificações importantes sobre seu treino e conteúdo, precisamos da sua permissão. Você pode ativar as notificações nas configurações do dispositivo."
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      dismissOnBackdropPress={true}
    />
  );
};

export default NotificationPermissionModal;

