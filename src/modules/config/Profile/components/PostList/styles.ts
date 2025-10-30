import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../../../../utils/scales';
import Label from '../../../../../components/Label/Label';

export const Container = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const Title = styled(Label)`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.gray_08};
`;

export const listContentStyle = {
  paddingBottom: verticalScale(20),
  gap: verticalScale(12),
};
