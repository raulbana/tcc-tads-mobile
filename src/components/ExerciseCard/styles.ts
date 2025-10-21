import {styled} from 'styled-components/native';
import {horizontalScale, moderateScale} from '../../utils/scales';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.gray_03};
  border-radius: ${moderateScale(16)}px;
  gap: ${moderateScale(12)}px;
  padding: ${moderateScale(16)}px;
`;
export const HeaderRow = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContainer = styled.View`
  flex: 1;
  margin-right: ${horizontalScale(8)}px;
`;

export const LabelContainer = styled.View`
  flex-shrink: 0;
`;

export const DataRow = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: ${horizontalScale(12)}px;
`;

export const DataRowItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const ButtonRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${horizontalScale(12)}px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
`;
