import styled from 'styled-components/native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  flex: 1;
  gap: ${verticalScale(24)}px;
`;

export const Section = styled.View`
  gap: ${verticalScale(16)}px;
`;

export const InputContainer = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const ErrorContainer = styled.View`
  padding: ${verticalScale(12)}px;
  background-color: ${({theme}) => theme.colors.error_02};
  border-radius: ${horizontalScale(8)}px;
  border-left-width: ${moderateScale(4)}px;
  border-left-color: ${({theme}) => theme.colors.error};
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(12)}px;
  padding-top: ${verticalScale(16)}px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
`;

export const scrollContentStyle = {
  paddingBottom: verticalScale(20),
};
