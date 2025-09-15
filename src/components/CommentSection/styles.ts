import styled from 'styled-components/native';
import {verticalScale} from '../../utils/scales';

export const Container = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.gray_04};
  padding-top: ${verticalScale(16)}px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
