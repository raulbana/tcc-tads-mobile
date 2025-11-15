import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const ModalOverlay = styled(Pressable)`
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
  flex-direction: row;
  justify-content: flex-end;
  gap: ${horizontalScale(12)}px;
  flex-wrap: wrap;
`;

