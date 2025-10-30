import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../../utils/scales';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${horizontalScale(8)}px;
`;

export const categoryButtonStyle = {
  paddingVertical: verticalScale(8),
  paddingHorizontal: horizontalScale(12),
  borderRadius: moderateScale(16),
  borderWidth: 1,
  borderColor: 'transparent',
};
