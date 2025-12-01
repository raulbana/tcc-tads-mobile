import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Pencil, Trash} from 'phosphor-react-native';
import * as S from './styles';
import Label from '../Label/Label';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

type CellValue = string | number | boolean | null | undefined | React.ReactNode;

export interface TableColumn<K extends string> {
  key: K;
  label: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<
  T extends {id: string} & Record<string, CellValue>,
  K extends Exclude<keyof T, 'id'> & string = Exclude<keyof T, 'id'> & string,
> {
  columns: TableColumn<K>[];
  data: T[];
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  showEditIcon?: boolean;
  showDeleteIcon?: boolean;
}

function DataTable<
  T extends {id: string} & Record<string, CellValue>,
  K extends Exclude<keyof T, 'id'> & string = Exclude<keyof T, 'id'> & string,
>({
  columns,
  data,
  onEditRow,
  onDeleteRow,
  showEditIcon = true,
  showDeleteIcon = true,
}: DataTableProps<T, K>) {
  const theme = useDynamicTheme();

  const handleEditPress = (row: T) => {
    onEditRow?.(row);
  };
  const handleDeletePress = (row: T) => {
    onDeleteRow?.(row);
  };

  const renderCell = (row: T, column: TableColumn<K>) => {
    const raw = row[column.key];
    let displayValue: CellValue = raw;

    if (typeof raw === 'boolean') {
      displayValue = raw ? 'Sim' : 'Não';
    }

    const isReasonColumn = column.key === ('reason' as K);
    const textValue =
      typeof displayValue === 'string'
        ? displayValue
        : String(displayValue ?? '');
    const limitedText = isReasonColumn ? textValue.slice(0, 5) : textValue;

    return (
      <S.Cell
        key={column.key}
        width={column.width}
        align={column.align || 'center'}>
        <Label
          typography={theme.typography.paragraph.sm1}
          color={theme.colors.gray_08}
          numberOfLines={1}
          ellipsizeMode="tail">
          {isReasonColumn
            ? (limitedText as React.ReactNode)
            : (displayValue as React.ReactNode)}
        </Label>
      </S.Cell>
    );
  };

  return (
    <S.Container>
      <S.HeaderRow>
        {columns.map(column => (
          <S.HeaderCell
            key={column.key}
            width={column.width}
            align={column.align || 'center'}>
            <Label
              typography={theme.typography.paragraph.m0}
              color={theme.colors.gray_08}
              text={column.label}
            />
          </S.HeaderCell>
        ))}
        {showEditIcon && <S.EditCell width={32} align="center" />}
        {showDeleteIcon && <S.DeleteCell width={32} align="center" />}
      </S.HeaderRow>

      {data.map(row => (
        <S.DataRow key={row.id}>
          {columns.map(column => renderCell(row, column))}
          {showEditIcon && (
            <S.EditCell width={32} align="left">
              <TouchableOpacity
                onPress={() => handleEditPress(row)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pencil size={16} color={theme.colors.gray_08} />
              </TouchableOpacity>
            </S.EditCell>
          )}
          {showDeleteIcon && (
            <S.DeleteCell width={32} align="left">
              <TouchableOpacity
                onPress={() => handleDeletePress(row)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Trash size={16} color={theme.colors.error} />
              </TouchableOpacity>
            </S.DeleteCell>
          )}
        </S.DataRow>
      ))}
    </S.Container>
  );
}

export default DataTable;
