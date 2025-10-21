import styled from 'styled-components/native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../../../utils/scales';
import RatingIllustration from '../../../../../assets/illustrations/rating_illustration.svg';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${verticalScale(20)}px ${horizontalScale(16)}px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(32)}px;
`;

export const CongratulationsTag = styled.View`
  background-color: ${({theme}) => theme.colors.purple_01};
  padding: ${verticalScale(8)}px ${horizontalScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const Title = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const Subtitle = styled.View`
  align-items: center;
  padding-horizontal: ${horizontalScale(24)}px;
`;

export const IllustrationContainer = styled.View`
  width: 100%;
  height: ${moderateScale(200)}px;
  margin-bottom: ${verticalScale(36)}px;
  align-items: center;

`;

export const Illustration = styled(RatingIllustration).attrs({
  height: '100%',
  width: '100%',
})``;

export const EvaluationSection = styled.View`
  margin-bottom: ${verticalScale(32)}px;
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const SectionTitle = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(8)}px;
`;

export const SectionDescription = styled.View`
`;

export const RatingContainer = styled.View`
  width: 100%;
  margin-bottom: ${verticalScale(40)}px;
`;

export const ActionContainer = styled.View`
  width: 100%;
  gap: ${verticalScale(12)}px;
`;

export const ProgressContainer = styled.View`
  width: 100%;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: ${verticalScale(4)}px;
  background-color: ${({theme}) => theme.colors.gray_04};
  border-radius: ${moderateScale(2)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const ProgressFill = styled.View<{width: string}>`
  height: 100%;
  width: ${({width}) => width};
  background-color: ${({theme}) => theme.colors.purple_04};
  border-radius: ${moderateScale(2)}px;
`;
