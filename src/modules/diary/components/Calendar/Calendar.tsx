import React from 'react';
import {View} from 'react-native';
import {CaretLeft, CaretRight} from 'phosphor-react-native';
import CalendarTile from '../../../../components/Calendar/components/CalendarTile/CalendarTile';
import Label from '../../../../components/Label/Label';
import {useCalendar} from './useCalendar';
import {useDiary} from '../../../../contexts/DiaryContext';
import * as S from './styles';
import DayRegisterModal from '../DayRegisterModal/DayRegisterModal';
import DayDataModal from '../DayDataModal/DayDataModal';
import BottomModal from '../../../../components/BottomModal/BottomModal';
import Button from '../../../../components/Button/Button';
import moment from 'moment';
import {useDynamicTheme} from '../../../../hooks/useDynamicTheme';

interface CalendarProps {
  initialSelectedDate?: string;
}

const Calendar: React.FC<CalendarProps> = ({initialSelectedDate}) => {
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
    onDeleteRegister,
    isDeletingModalOpen,
    setIsDeletingModalOpen,
    findRegisterIndex,
  } = useCalendar(initialSelectedDate);

  const {addUrinationData, editUrinationData, deleteUrinationData} = useDiary();

  const theme = useDynamicTheme();

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
                <View key={`${item.date}-${j}`} style={{width: tileWidth}}>
                  <CalendarTile
                    dayItem={item}
                    width={tileWidth}
                    onPress={() => onPressDay(item)}
                    isDisabled={moment(item.date).isAfter(moment())}
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
          onDeleteRecord={onDeleteRegister}
        />
      )}
      <DayDataModal
        title="Novo Registro"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={async formData => {
          if (selectedDayItem) {
            try {
              await addUrinationData(selectedDayItem.date, formData);
              setIsAddModalOpen(false);
            } catch (error) {
              console.error('Erro ao salvar dados de micção:', error);
            }
          }
        }}
        baseDate={
          selectedDayItem?.date ? new Date(selectedDayItem.date) : undefined
        }
      />

      {selectedRegisterItem && (
        <DayDataModal
          title="Editar Registro"
          isOpen={isEditingModalOpen}
          onClose={() => setIsEditingModalOpen(false)}
          onSubmit={async formData => {
            if (selectedDayItem && selectedRegisterItem) {
              try {
                const index = findRegisterIndex(
                  selectedRegisterItem,
                  selectedDayItem,
                );

                if (index !== -1) {
                  await editUrinationData(
                    selectedDayItem.date,
                    index,
                    formData,
                  );
                  setIsEditingModalOpen(false);
                }
              } catch (error) {
                console.error('Erro ao atualizar dados de micção:', error);
              }
            }
          }}
          selectedValues={selectedRegisterItem}
          baseDate={
            selectedDayItem?.date ? new Date(selectedDayItem.date) : undefined
          }
        />
      )}

      {isDeletingModalOpen && (
        <BottomModal
          isOpen={isDeletingModalOpen}
          onClose={() => setIsDeletingModalOpen(false)}
          footer={
            <Button
              text={'Cancelar'}
              type="TERTIARY"
              onPress={() => setIsDeletingModalOpen(false)}
            />
          }>
          <S.DeleteModalContent>
            <S.DeleteModalTitle>
              <Label
                text="Deseja deletar este registro?"
                typography={theme.typography.paragraph.sb2}
                color={theme.colors.gray_08}
              />
            </S.DeleteModalTitle>
            <Button
              text="Deletar"
              onPress={async () => {
                if (selectedRegisterItem && selectedDayItem) {
                  try {
                    const index = findRegisterIndex(
                      selectedRegisterItem,
                      selectedDayItem,
                    );

                    if (index !== -1) {
                      await deleteUrinationData(selectedDayItem.date, index);
                      setIsDeletingModalOpen(false);
                    }
                  } catch (error) {
                    console.error('Erro ao deletar registro:', error);
                  }
                }
              }}
              disabled={!selectedRegisterItem || !selectedDayItem}
            />
          </S.DeleteModalContent>
        </BottomModal>
      )}
    </S.Container>
  );
};

export default Calendar;
