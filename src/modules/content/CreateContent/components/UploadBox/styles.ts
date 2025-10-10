import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../utils/scales';
import theme from '../../../../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

export const Wrapper = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
  overflow: visible;
`;

export const Container = styled.TouchableOpacity<{hasError?: boolean}>`
  border: 1px dashed ${({hasError}) => (hasError ? theme.colors.error : '#cbd5e1')};
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
  elevation: ${({isActive}) => (isActive ? 5 : 0)};
  shadow-color: ${({isActive}) => (isActive ? '#000' : 'transparent')};
  shadow-offset: ${({isActive}) => (isActive ? '0px 2px' : '0px 0px')};
  shadow-opacity: ${({isActive}) => (isActive ? 0.5 : 0)};
  shadow-radius: ${({isActive}) => (isActive ? '4px' : '0px')};
  z-index: 1000;
`;

export const CardContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(12)}px;
  padding: ${verticalScale(8)}px ${horizontalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${theme.colors.gray_02};
  border: 1px solid ${theme.colors.gray_04};
  overflow: visible;
`;

export const IconWrapper = styled.View`
  width: ${horizontalScale(40)}px;
  height: ${horizontalScale(40)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.purple_01};
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
  background-color: ${theme.colors.purple_01};
  border-radius: ${moderateScale(8)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(12)}px;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;
