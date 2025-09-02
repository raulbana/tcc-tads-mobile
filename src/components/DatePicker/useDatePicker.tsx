import {useState} from 'react';

const useDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  }
  const closeModal = () => setIsOpen(false);
  return {isOpen, openModal, closeModal, setIsOpen};
};

export default useDatePicker;
