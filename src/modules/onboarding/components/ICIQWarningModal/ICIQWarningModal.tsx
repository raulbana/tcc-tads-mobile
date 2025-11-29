import React from 'react';
import DialogModal from '../../../../components/DialogModal/DialogModal';
import Label from '../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../hooks/useDynamicTheme';
import * as S from './styles';

export interface ICIQWarningModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ICIQWarningModal: React.FC<ICIQWarningModalProps> = ({
  visible,
  onClose,
  onContinue,
}) => {
  const theme = useDynamicTheme();

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      title="Atenção: Recomendação Médica"
      dismissOnBackdropPress={false}
      primaryButton={{
        label: 'Entendi',
        onPress: onContinue,
        type: 'PRIMARY',
      }}>
      <S.Content>
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_08}
          text="Com base nas suas respostas ao questionário, identificamos que você possui uma condição grave ou muito grave de incontinência urinária."
          textAlign="justify"
        />
        <S.Spacing />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_08}
          text="Por conta da sua condição, recomendamos fortemente que você consulte um médico antes de realizar exercícios de fisioterapia pélvica. O acompanhamento profissional é essencial para garantir sua segurança e o melhor tratamento."
          textAlign="justify"
        />
        <S.Spacing />
        <Label
          typography={theme.typography.paragraph.sb2}
          color={theme.colors.error}
          text="Importante: O módulo de exercícios será bloqueado até que você consulte um profissional de saúde."
          textAlign="justify"
        />
      </S.Content>
    </DialogModal>
  );
};

export default ICIQWarningModal;
