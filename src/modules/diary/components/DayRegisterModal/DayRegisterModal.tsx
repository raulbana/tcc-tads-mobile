import React, {useMemo} from 'react';
import BottomModal from '../../../../components/BottomModal/BottomModal';
import DataTable, {
  TableColumn,
} from '../../../../components/DataTable/DataTable';
import {CalendarDayData, UrinationData} from '../../../../types/diary';
import Button from '../../../../components/Button/Button';
import Label from '../../../../components/Label/Label';
import theme from '../../../../theme/theme';
import moment from 'moment';
import * as S from './styles';

export interface DayRegisterModalProps {
  dayItem: CalendarDayData;
  isOpen: boolean;
  onClose: () => void;
  onAddRecord: () => void;
  onEditRecord: (row: UrinationData) => void;
}

const amountLabel: Record<string, string> = {
  LOW: 'Baixo',
  MEDIUM: 'Médio',
  HIGH: 'Alto',
};

const DayRegisterModal: React.FC<DayRegisterModalProps> = ({
  dayItem,
  isOpen,
  onClose,
  onAddRecord,
  onEditRecord,
}) => {
  const mockData: UrinationData[] = [
    {
      time: '14:25',
      amount: 'HIGH',
      leakage: true,
      reason: 'Espirro',
      urgency: false,
      observation: '',
    },
    {
      time: '13:25',
      amount: 'HIGH',
      leakage: true,
      reason: 'Espirro',
      urgency: false,
      observation: '',
    },
    {
      time: '11:25',
      amount: 'HIGH',
      leakage: true,
      reason: 'Espirro',
      urgency: false,
      observation: '',
    },
    {
      time: '12:25',
      amount: 'HIGH',
      leakage: true,
      reason: 'Espirro',
      urgency: false,
      observation: '',
    },
  ];

  const records = (
    dayItem.urinationData?.length
      ? dayItem.urinationData.map(r => ({
          ...r,
          urgency: (r as any).urgency ?? false,
        }))
      : mockData
  ) as (UrinationData & {urgency: boolean})[];

  type TableRow = {
    id: string;
    time: string;
    amount: string;
    urgency: boolean;
    leakage: boolean;
    reason: string;
  };

  const columns: TableColumn<Exclude<keyof TableRow, 'id'>>[] = [
    {key: 'time', label: 'Horário'},
    {key: 'amount', label: 'Volume'},
    {key: 'urgency', label: 'Urgência'},
    {key: 'leakage', label: 'Perda'},
    {key: 'reason', label: 'Motivo'},
  ];

  const rows: TableRow[] = useMemo(
    () =>
      records.map((r, idx) => ({
        id: `${dayItem.date.toISOString()}-${idx}`,
        time: r.time,
        amount: amountLabel[r.amount] ?? r.amount,
        urgency: r.urgency,
        leakage: r.leakage,
        reason: r.reason || '—',
      })),
    [records, dayItem.date],
  );

  const hasRealData = !!dayItem.urinationData?.length;

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Registros do dia ${moment(dayItem.date).format('DD/MM')}`}
      showHandle
      showClose
      closeOnBackdropPress>
      {rows.length > 0 && (
        <DataTable
          columns={columns}
          data={rows}
          onEditRow={row => {
            const idx = rows.findIndex(r => r.id === row.id);
            if (idx !== -1 && records[idx]) {
              onEditRecord(records[idx]);
            }
          }}
          showEditIcon
        />
      )}
      <S.Wrapper>
        {!hasRealData && rows.length === 0 && (
          <S.EmptyDataContainer>
            <S.IllustrationSheet />
            <Label
              text="Sem registros de ocorrências nesta data"
              typography={theme.typography.paragraph.m5}
              color={theme.colors.gray_08}
              textAlign="center"
            />
          </S.EmptyDataContainer>
        )}

        <Button
          text={
            <Label
              typography={theme.typography.paragraph.sb2}
              text="Adicionar Registro"
              color={theme.colors.white}
            />
          }
          onPress={onAddRecord}
        />
      </S.Wrapper>
    </BottomModal>
  );
};

export default DayRegisterModal;
