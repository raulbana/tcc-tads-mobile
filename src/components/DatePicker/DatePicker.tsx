import React from 'react';
import Label from '../Label/Label';
import theme from '../../theme/theme';
import DatePicker from 'react-native-date-picker';
import useDatePicker from './useDatePicker';
import Input from '../Input/Input';
import * as S from './styles';
import 'moment/locale/pt-br';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';

type DatePickerInputProps = {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  onCancel: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
  required?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  modal?: boolean;
  placeholder?: string;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate = new Date(),
  required,
  onCancel,
  mode = 'date',
  modal = false,
  placeholder,
}) => {
  const {isOpen, setIsOpen} = useDatePicker();

  return (
    <S.Container>
      {label && (
        <Label
          typography={theme.typography.paragraph.r4}
          color={theme.colors.gray_08}
          text={label + (required ? ' *' : '')}
        />
      )}

      {modal && (
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Input
            type="date"
            onChange={inputValue => {
              const date = inputValue ? new Date(inputValue) : new Date();
              onChange(date);
            }}
            disabled={false}
            value={value ? moment(value).format('DD/mm/YYYY') : ''}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder ?? 'Selecione uma data'}
          />
        </TouchableOpacity>
      )}
      <DatePicker
        modal={modal}
        mode={mode}
        onDateChange={date => {
          if (!date) return;
          if (modal) return;
          onChange(date);
          setIsOpen(false);
        }}
        open={modal ? isOpen : true}
        date={value}
        onConfirm={date => {
          onChange(date);
          setIsOpen(false);
        }}
        onCancel={() => {
          onCancel();
          setIsOpen(false);
        }}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale="pt-BR"
        theme="light"
        dividerColor={theme.colors.gray_04}
      />
    </S.Container>
  );
};

export default DatePickerInput;
