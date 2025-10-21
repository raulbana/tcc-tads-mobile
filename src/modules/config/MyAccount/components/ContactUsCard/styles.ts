import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../utils/scales';

export const Outer = styled.TouchableOpacity`
  width: 100%;
  position: relative;
`;

export const Container = styled.View`
  width: 100%;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({theme}) => theme.colors.purple_01};
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: flex-end;
  overflow: visible;
  position: relative;
  z-index: -1;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

export const TextSection = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${verticalScale(10)}px;
  padding-right: ${horizontalScale(95)}px;
  justify-content: center;
`;

export const TextRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const ImageWrapper = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const NurseImage = styled.Image`
  min-width: ${horizontalScale(108)}px;
  min-height: ${verticalScale(135)}px;
`;
