import styled from 'styled-components/native';
import {moderateScale, verticalScale} from '../../../../../utils/scales';

export const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(32)}px;
  flex: 1;
`;

export const QuestionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(24)}px;
  max-width: ${moderateScale(400)}px;
  width: 100%;
`;

export const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: ${verticalScale(16)}px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: flex-end;
  padding: ${moderateScale(16)}px;
`;