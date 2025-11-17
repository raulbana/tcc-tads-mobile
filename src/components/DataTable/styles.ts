import styled from 'styled-components/native';
import { horizontalScale, moderateScale, verticalScale} from '../../utils/scales';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.gray_01};
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.gray_01};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.gray_03};
`;

export const HeaderCell = styled.View<{width?: number; align?: string}>`
  flex: ${({width}) => (width ? 0 : 1)};
  width: ${({width}) => (width ? horizontalScale(width) : 'auto')}px;
  padding: ${moderateScale(8)}px;
  justify-content: center;
  align-items: ${({align}) => {
    switch (align) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
`;

export const DataRow = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.gray_02};
  min-height: ${verticalScale(48)}px;
`;

export const Cell = styled.View<{width?: number; align?: string}>`
  flex: ${({width}) => (width ? 0 : 1)};
  width: ${({width}) => (width ? horizontalScale(width) : 'auto')}px;
  padding: ${verticalScale(12)}px ${horizontalScale(8)}px;
  justify-content: center;
  align-items: ${({align}) => {
    switch (align) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
`;

export const EditCell = styled.View<{width?: number; align?: string}>`
  width: ${({width}) => (width ? horizontalScale(width) : 'auto')}px;
  justify-content: center;
  align-items: ${({align}) => {
    switch (align) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
  padding-horizontal: ${horizontalScale(8)}px;

`;

export const DeleteCell = styled.View<{width?: number; align?: string}>`
  width: ${({width}) => (width ? horizontalScale(width) : 'auto')}px;
  justify-content: center;
  align-items: ${({align}) => {
    switch (align) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
  padding-horizontal: ${horizontalScale(8)}px;
`;