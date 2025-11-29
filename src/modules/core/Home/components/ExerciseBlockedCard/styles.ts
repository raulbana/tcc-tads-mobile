import styled from 'styled-components/native';
import {horizontalScale, moderateScale, verticalScale} from '../../../../../utils/scales';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.error + '15'};
  border-left-width: 4px;
  border-left-color: ${({theme}) => theme.colors.error};
  border-radius: ${moderateScale(12)}px;
  gap: ${horizontalScale(16)}px;
  padding: ${moderateScale(16)}px;
  overflow: hidden;
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${verticalScale(12)}px;
  width: 100%;
`;

export const TextRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

