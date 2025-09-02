import React, {useMemo} from 'react';
import Label from '../Label/Label';
import theme from '../../theme/theme';
import DatePicker from 'react-native-date-picker';
import useDatePicker from './useDatePicker';
import Input from '../Input/Input';
import * as S from './styles';
import moment from 'moment';

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
  disabled?: boolean;
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
  disabled = false,
}) => {
  const {isOpen, openModal, closeModal} = useDatePicker();

  const displayValue = useMemo(() => {
    if (!value) return '';
    switch (mode) {
      case 'time':
        return moment(value).format('HH:mm');
      case 'datetime':
        return moment(value).format('DD/MM/YYYY HH:mm');
      default:
        return moment(value).format('DD/MM/YYYY');
    }
  }, [value, mode]);

  return (
    <S.Container>
      {label && (
        <Label
          typography={theme.typography.paragraph.r4}
          color={theme.colors.gray_08}
          text={label + (required ? ' *' : '')}
        />
      )}

      {modal ? (
        <S.InputPressable disabled={disabled} onPress={openModal}>
          <Input
            type="date"
            value={displayValue}
            placeholder={
              placeholder ??
              (mode === 'time' ? 'Selecione o horário' : 'Selecione a data')
            }
            disabled={true}
            onFocus={() => {
              if (!disabled) openModal();
            }}
            onChange={() => {}}
          />
        </S.InputPressable>
      ) : (
        <Input
          type="date"
          value={displayValue}
          placeholder={
            placeholder ??
            (mode === 'time' ? 'Selecione o horário' : 'Selecione a data')
          }
          disabled={disabled}
          onChange={str => {
            if (!str) return;
            const dt = new Date(str);
            if (!isNaN(dt.getTime())) onChange(dt);
          }}
        />
      )}

      <DatePicker
        modal={modal}
        open={modal ? isOpen : true}
        date={value || new Date()}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale="pt-BR"
        theme="light"
        dividerColor={theme.colors.gray_04}
        onConfirm={date => {
          onChange(date);
          closeModal();
        }}
        onCancel={() => {
          onCancel();
          closeModal();
        }}
        onDateChange={date => {
          if (modal) return;
          onChange(date);
        }}
      />
    </S.Container>
  );
};

export default DatePickerInput;
