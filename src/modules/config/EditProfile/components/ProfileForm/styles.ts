import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  gap: ${verticalScale(24)}px;
`;

export const Section = styled.View`
  gap: ${verticalScale(16)}px;
`;

export const InputContainer = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(12)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
`;
