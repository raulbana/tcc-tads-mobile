import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../utils/scales';
import LinearGradient from 'react-native-linear-gradient';

export const Wrapper = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
  overflow: visible;
`;

export const Container = styled.TouchableOpacity<{hasError?: boolean}>`
  border: ${moderateScale(1)}px dashed
    ${({hasError, theme}) => (hasError ? theme.colors.error : '#cbd5e1')};
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(20)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({hasError}) => (hasError ? '#fff5f5' : '#f9fafb')};
  gap: ${verticalScale(8)}px;
  overflow: visible;
`;

export const ThumbnailPreview = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${moderateScale(16)}px;
`;

export const DraggableItem = styled.TouchableOpacity<{
  isActive: boolean;
  isDraggable?: boolean;
}>`
  width: 100%;
  margin-bottom: ${verticalScale(8)}px;
  opacity: ${({isActive, isDraggable = true}) =>
    isActive ? 0.9 : isDraggable ? 1 : 0.7};
  transform: ${({isActive}) => (isActive ? 'scale(1.02)' : 'scale(1)')};
  elevation: ${({isActive}) => (isActive ? 8 : 2)};
  shadow-color: ${({isActive}) => (isActive ? '#000' : 'transparent')};
  shadow-offset: ${({isActive}) =>
    isActive ? `0px ${moderateScale(4)}px` : '0px 0px'};
  shadow-opacity: ${({isActive}) => (isActive ? 0.3 : 0)};
  shadow-radius: ${({isActive}) =>
    isActive ? `${moderateScale(6)}px` : '0px'};
  z-index: ${({isActive}) => (isActive ? 1000 : 1)};
  background-color: ${({isActive}) =>
    isActive ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  border-radius: ${({isActive}) =>
    isActive ? `${moderateScale(8)}px` : '0px'};
  overflow: ${({isActive}) => (isActive ? 'visible' : 'hidden')};
`;

export const CardContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(12)}px;
  padding: ${verticalScale(8)}px ${horizontalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({theme}) => theme.colors.gray_02};
  border: ${moderateScale(1)}px solid ${({theme}) => theme.colors.gray_04};
  overflow: visible;
`;

export const IconWrapper = styled.View`
  width: ${horizontalScale(40)}px;
  height: ${horizontalScale(40)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.purple_01};
`;

export const InfoWrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(4)}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${verticalScale(4)}px;
`;

export const ListContainer = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
  padding-horizontal: ${horizontalScale(4)}px;
  overflow: visible;
`;

export const ThumbnailPreviewText = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${verticalScale(24)}px;
  z-index: 10;
`;

export const ThumbnailGradient = styled(LinearGradient).attrs({
  colors: ['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0)'],
  locations: [0, 0.8, 1],
  start: {x: 0.5, y: 1},
  end: {x: 0.5, y: 0},
})`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
`;
export const ThumbnailContainer = styled.View`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${moderateScale(16)}px;
  overflow: hidden;
`;

export const HintContainer = styled.View`
  background-color: ${({theme}) => theme.colors.purple_01};
  border-radius: ${moderateScale(8)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(12)}px;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;
