import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../utils/scales';
import theme from '../../../../../theme/theme';

export const Wrapper = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
`;

export const Container = styled.TouchableOpacity`
  border: 1px dashed #cbd5e1;
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(20)}px;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  gap: ${verticalScale(8)}px;
`;

export const ThumbnailPreview = styled.Image`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${moderateScale(12)}px;
`;

export const DraggableWrapper = styled.TouchableOpacity`
  width: 100%;
`;

export const ListContainer = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
  padding-horizontal: ${horizontalScale(4)}px;
`;
