import React from 'react';
import BottomModal from '../../../../components/BottomModal/BottomModal';
import {DayDataFormValues} from './components/DayDataForm/useDayDataForm';
import DayDataForm from './components/DayDataForm/DayDataForm';

export interface DayDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DayDataFormValues) => void;
  selectedValues?: DayDataFormValues;
  title: string;
}

const DayDataModal: React.FC<DayDataModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  selectedValues,
}) => {
  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title={title}>
      <DayDataForm onSubmit={onSubmit} defaultValues={selectedValues} />
    </BottomModal>
  );
};

export default DayDataModal;
