import React from 'react';
import {View} from 'react-native';
import {CaretLeft, CaretRight} from 'phosphor-react-native';
import CalendarTile from '../../../../components/Calendar/components/CalendarTile/CalendarTile';
import Label from '../../../../components/Label/Label';
import theme from '../../../../theme/theme';
import {useCalendar} from './useCalendar';
import * as S from './styles';
import DayRegisterModal from '../DayRegisterModal/DayRegisterModal';
import DayDataModal from '../DayDataModal/DayDataModal';

const Calendar: React.FC = () => {
  const {
    monthLabel,
    goPrevMonth,
    goNextMonth,
    rows,
    tileWidth,
    COLUMNS,
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    onPressDay,
    selectedDayItem,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditingModalOpen,
    setIsEditingModalOpen,
    selectedRegisterItem,
    onEditRegister,
  } = useCalendar();

  return (
    <S.Container>
      <S.Header>
        <S.NavButton onPress={goPrevMonth} accessibilityLabel="Mês anterior">
          <CaretLeft color={theme.colors.gray_07} size={20} />
        </S.NavButton>
        <Label
          text={monthLabel}
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
        />
        <S.NavButton onPress={goNextMonth} accessibilityLabel="Próximo mês">
          <CaretRight color={theme.colors.gray_07} size={20} />
        </S.NavButton>
      </S.Header>

      <S.Grid>
        {rows.map((row, idx) => {
          const isLast = idx === rows.length - 1;
          const shouldCenter = isLast && row.length < COLUMNS;
          return (
            <S.Row key={`row-${idx}`} $center={shouldCenter}>
              {row.map((item, j) => (
                <View
                  key={`${item.date.toISOString()}-${j}`}
                  style={{width: tileWidth}}>
                  <CalendarTile
                    dayItem={item}
                    width={tileWidth}
                    onPress={() => onPressDay(item)}
                  />
                </View>
              ))}
            </S.Row>
          );
        })}
      </S.Grid>
      {selectedDayItem && (
        <DayRegisterModal
          dayItem={selectedDayItem}
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onAddRecord={() => {
            setIsRegisterModalOpen(false);
            setIsAddModalOpen(true);
          }}
          onEditRecord={onEditRegister}
        />
      )}
      <DayDataModal
        title="Novo Registro"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={formData => {
        }}
        baseDate={selectedDayItem?.date}
      />

      {selectedRegisterItem && (
        <DayDataModal
          title="Editar Registro"
          isOpen={isEditingModalOpen}
          onClose={() => setIsEditingModalOpen(false)}
          onSubmit={formData => {
          }}
          selectedValues={selectedRegisterItem}
          baseDate={selectedDayItem?.date}
        />
      )}
    </S.Container>
  );
};

export default Calendar;
