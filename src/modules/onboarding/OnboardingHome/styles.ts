import styled from 'styled-components/native';
import OnboardingIllustration from '../../../assets/illustrations/onboarding_illustration.svg';
import {horizontalScale, verticalScale} from '../../../utils/scales';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-vertical: ${verticalScale(16)}px;
  gap: ${verticalScale(32)}px;
`;

export const Illustration = styled(OnboardingIllustration).attrs({
  width: '100%',
})``;

export const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: flex-end;
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-vertical: ${verticalScale(16)}px;
  gap: ${verticalScale(16)}px;
`;
