import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../../../../utils/scales';

export const Wrapper = styled.ScrollView`
  width: 100%;
  padding-bottom: ${verticalScale(32)}px;
`;

export const QuestionContainer = styled.View`
  width: 100%;
`;

export const QuestionSectionWrapper = styled.View`
  width: 100%;
  align-items: center;
  gap: ${verticalScale(24)}px;
`;

export const QuestionContent = styled.View`
  width: 100%;
  align-items: center;
  gap: ${verticalScale(24)}px;
`;

export const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: ${verticalScale(16)}px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding-top: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(48)}px;
`;

export const StepLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${horizontalScale(8)}px;
  margin-vertical: ${verticalScale(16)}px;
`;
