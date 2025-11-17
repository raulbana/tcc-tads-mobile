import React, {useState} from 'react';
import BottomModal from '../BottomModal/BottomModal';
import Label from '../Label/Label';
import Input from '../Input/Input';
import Button from '../Button/Button';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';
import * as S from './styles';

export interface ReportModalProps {
  isVisible: boolean;
  onClose: () => void;
  onReport: (reason: string) => Promise<void>;
  isLoading?: boolean;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isVisible,
  onClose,
  onReport,
  isLoading = false,
}) => {
  const theme = useDynamicTheme();
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleReport = async () => {
    if (!reason.trim()) {
      setError('Por favor, informe o motivo da denúncia');
      return;
    }

    setError('');
    try {
      await onReport(reason.trim());
      setReason('');
      onClose();
    } catch (err) {
      setError('Erro ao enviar denúncia. Tente novamente.');
    }
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  return (
    <BottomModal
      isOpen={isVisible}
      onClose={handleClose}
      title="Denunciar conteúdo"
      showHandle>
      <S.Container>
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
          text="Descreva o motivo da denúncia:"
        />
        <S.InputContainer>
          <Input
            type="text"
            value={reason}
            onChange={setReason}
            placeholder="Ex: Conteúdo ofensivo, spam, informações falsas..."
            multiline
            numberOfLines={4}
            error={error}
          />
        </S.InputContainer>
        {error && (
          <S.ErrorContainer>
            <Label
              typography={theme.typography.paragraph.sm2}
              color={theme.colors.error}
              text={error}
            />
          </S.ErrorContainer>
        )}
        <S.ButtonContainer>
          <Button
            text="Cancelar"
            onPress={handleClose}
            type="SECONDARY"
            disabled={isLoading}
          />
          <Button
            text="Enviar denúncia"
            onPress={handleReport}
            type="PRIMARY"
            loading={isLoading}
            disabled={isLoading}
          />
        </S.ButtonContainer>
      </S.Container>
    </BottomModal>
  );
};

export default ReportModal;
