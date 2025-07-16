import {useState} from 'react';

const useDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};

export default useDatePicker;
