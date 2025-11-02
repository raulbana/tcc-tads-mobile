import styled from 'styled-components/native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${verticalScale(32)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(24)}px;
`;

export const IconContainer = styled.View`
  width: ${moderateScale(80)}px;
  height: ${moderateScale(80)}px;
  border-radius: ${moderateScale(40)}px;
  background-color: ${({theme}) => theme.colors.gray_03};
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  align-items: center;
  gap: ${verticalScale(8)}px;
`;

export const ActionsContainer = styled.View`
  gap: ${verticalScale(12)}px;
  width: 100%;
  max-width: ${horizontalScale(280)}px;
`;
