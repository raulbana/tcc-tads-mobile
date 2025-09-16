import styled from 'styled-components/native';
import {moderateScale} from '../../utils/scales';

export const Container = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1.6;
  border-radius: ${moderateScale(16)}px;
  overflow: hidden;
`;

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  top: ${moderateScale(16)}px;
  left: ${moderateScale(16)}px;
  width: auto;
`;

// New gradient overlay
export const GradientOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%; // Covers bottom 70% with gradient
  background-color: transparent;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;

// Updated for React Native compatibility
export const Overlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background-color: transparent;
`;

// This creates the actual gradient effect
export const OverlayGradient = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Content = styled.View`
  width: 100%;
  padding: ${moderateScale(16)}px;
  z-index: 1; // Ensures content appears above gradient
`;
