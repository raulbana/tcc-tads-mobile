import styled from 'styled-components/native';
import { moderateScale, horizontalScale } from '../../utils/scales';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  margin-vertical: ${moderateScale(16)}px;
`;

export const LabelsRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${moderateScale(8)}px;
  padding-horizontal: ${horizontalScale(8)}px;
`;