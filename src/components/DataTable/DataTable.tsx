import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Pencil} from 'phosphor-react-native';
import * as S from './styles';
import theme from '../../theme/theme';
import Label from '../Label/Label';

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
  showEditIcon?: boolean;
}

function DataTable<
  T extends {id: string} & Record<string, CellValue>,
  K extends Exclude<keyof T, 'id'> & string = Exclude<keyof T, 'id'> & string,
>({columns, data, onEditRow, showEditIcon = true}: DataTableProps<T, K>) {
  const handleEditPress = (row: T) => {
    onEditRow?.(row);
  };

  const renderCell = (row: T, column: TableColumn<K>) => {
    const raw = row[column.key];
    let displayValue: CellValue = raw;

    if (typeof raw === 'boolean') {
      displayValue = raw ? 'Sim' : 'Não';
    }

    return (
      <S.Cell
        key={column.key}
        width={column.width}
        align={column.align || 'center'}>
        <Label typography={theme.typography.paragraph.sm1}>
          {displayValue as React.ReactNode}
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
      </S.HeaderRow>

      {data.map(row => (
        <S.DataRow key={row.id}>
          {columns.map(column => renderCell(row, column))}
          {showEditIcon && (
            <S.EditCell width={32} align="left">
              <TouchableOpacity onPress={() => handleEditPress(row)}>
                <Pencil size={16} color={theme.colors.gray_08} />
              </TouchableOpacity>
            </S.EditCell>
          )}
        </S.DataRow>
      ))}
    </S.Container>
  );
}

export default DataTable;
