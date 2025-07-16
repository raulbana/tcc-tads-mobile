import styled from "styled-components/native";
import { Animated } from 'react-native';
import { verticalScale, horizontalScale, moderateScale } from "../../utils/scales";
import { ToastType } from "./Toast";
import theme from "../../theme/theme";

interface ToastProps {
  type: ToastType;
}

const getBackgroundColor = (type: ToastType) => {
  switch (type) {
    case 'SUCCESS':
      return theme.colors.success_02;
    case 'ERROR':
      return theme.colors.error_02;
    case 'INFO':
      return theme.colors.purple_02;
    case 'WARNING':
      return theme.colors.warning_02;
    default:
      return theme.colors.gray_02;
  }
};

const getBorderColor = (type: ToastType) => {
  switch (type) {
    case 'SUCCESS':
      return theme.colors.success;
    case 'ERROR':
      return theme.colors.error;
    case 'INFO':
      return theme.colors.info;
    case 'WARNING':
      return theme.colors.warning;
    default:
      return theme.colors.gray_05;
  }
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
  background-color: ${({ type }) => getBackgroundColor(type)};
  border: 2px solid ${({ type }) => getBorderColor(type)};
  shadow-color: #000;
  shadow-opacity: 0.1;  
  shadow-radius: ${moderateScale(8)}px;
`;

export const IconContainer = styled.View`
  margin-right: ${horizontalScale(8)}px;
`;