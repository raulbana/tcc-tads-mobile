import styled from 'styled-components/native';
import {verticalScale} from '../../../../../utils/scales';

export const Container = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const listContentStyle = {
  paddingBottom: verticalScale(20),
  gap: verticalScale(12),
};
