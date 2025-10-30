import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(24)}px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(8)}px;
`;

export const ProfileSection = styled.View`
  align-items: center;
  padding: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const FormSection = styled.View`
  gap: ${verticalScale(16)}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(32)}px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(32)}px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(12)}px;
  margin-top: ${verticalScale(24)}px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
`;
