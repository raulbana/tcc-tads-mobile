import {useCallback, useMemo, useState} from 'react';
import DialogModal, {
  DialogModalProps,
  DialogModalButton,
} from '../components/DialogModal/DialogModal';

export type DialogOptions = Omit<DialogModalProps, 'visible' | 'onClose'>;

const useDialogModal = () => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null);

  const closeDialog = useCallback(() => {
    setDialogOptions(prev => {
      if (prev?.onClose) {
        prev.onClose();
      }
      return null;
    });
  }, []);

  const showDialog = useCallback((options: DialogOptions) => {
    setDialogOptions(options);
  }, []);

  const wrapButton = useCallback(
    (button?: DialogModalButton) =>
      button
        ? {
            ...button,
            onPress: async () => {
              await button.onPress?.();
              if (button.autoClose !== false) {
                closeDialog();
              }
            },
          }
        : undefined,
    [closeDialog],
  );

  const DialogPortal = useMemo(() => {
    if (!dialogOptions) return null;

    return (
      <DialogModal
        visible
        onClose={closeDialog}
        title={dialogOptions.title}
        description={dialogOptions.description}
        primaryButton={wrapButton(dialogOptions.primaryButton)}
        secondaryButton={wrapButton(dialogOptions.secondaryButton)}
        dismissOnBackdropPress={dialogOptions.dismissOnBackdropPress}
      >
        {dialogOptions.children}
      </DialogModal>
    );
  }, [dialogOptions, closeDialog, wrapButton]);

  return {
    DialogPortal,
    showDialog,
    hideDialog: closeDialog,
    isDialogVisible: !!dialogOptions,
  };
};

export default useDialogModal;

