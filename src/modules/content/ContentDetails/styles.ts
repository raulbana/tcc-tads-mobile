import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(24)}px;
  padding: ${moderateScale(16)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(24)}px;
`;

export const ModalCard = styled.View`
  width: 100%;
  max-width: ${horizontalScale(320)}px;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(24)}px;
  gap: ${verticalScale(12)}px;
  elevation: 10;
  shadow-color: rgba(0, 0, 0, 0.3);
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
`;

export const ModalActions = styled.View`
  width: 100%;
  gap: ${horizontalScale(12)}px;
`;
