import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/scales';
import {ToastType} from './Toast';

interface ToastProps {
  type: ToastType;
  backgroundColor: string;
  borderColor: string;
}

export const AnimatedToastContainer = styled(Animated.View)<ToastProps>`
  position: absolute;
  top: ${verticalScale(28)}px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1000;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor};
  border: ${moderateScale(2)}px solid ${({borderColor}) => borderColor};
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: ${moderateScale(8)}px;
`;

export const IconContainer = styled.View`
  margin-right: ${horizontalScale(8)}px;
`;
