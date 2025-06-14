import styled from 'styled-components/native';
import OnboardingIllustration from '../../../assets/illustrations/onboarding_illustration.svg';
import {verticalScale, horizontalScale} from '../../../utils/scales';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${verticalScale(32)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(32)}px;
`;

export const Illustration = styled(OnboardingIllustration).attrs({
  width: '100%',
})``;

export const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: flex-end;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${verticalScale(32)}px ${horizontalScale(8)}px;
  gap: ${verticalScale(16)}px;
`;
