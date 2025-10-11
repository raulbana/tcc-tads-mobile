import styled from 'styled-components/native';
import { moderateScale, verticalScale } from '../../../../../utils/scales';
import ExerciseIllustration from '../../../../../assets/illustrations/exercise_illustration.svg';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(24)}px;
  `;

  export const Illustration = styled(ExerciseIllustration).attrs({
  width: '100%',
})``;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
`;