import styled from 'styled-components/native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${verticalScale(20)}px ${horizontalScale(16)}px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ExerciseTag = styled.View`
  background-color: ${({theme}) => theme.colors.purple_01};
  padding: ${verticalScale(8)}px ${horizontalScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const Title = styled.View`
  align-items: center;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${verticalScale(24)}px;
`;

export const TabButton = styled.TouchableOpacity<{isActive: boolean}>`
  flex: 1;
  padding-horizontal: ${horizontalScale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  margin-horizontal: ${horizontalScale(8)}px;
  align-items: center;
  border-bottom-width: ${moderateScale(1)}px;
  border-bottom-color: ${({isActive, theme}) =>
    isActive ? theme.colors.gray_08 : theme.colors.gray_04};
`;

export const MediaContainer = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const VideoWrapper = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({theme}) => theme.colors.gray_08};
  height: ${verticalScale(200)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const PlayButton = styled.Text`
  position: absolute;
  font-size: ${moderateScale(50)}px;
  color: ${({theme}) => theme.colors.white};
  opacity: 0.8;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: ${verticalScale(200)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  flex-direction: row;
  gap: ${horizontalScale(4)}px;
  align-items: center;
  justify-content: space-between;
`;

export const ExerciseImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${moderateScale(12)}px;
  flex: 1;
`;

export const DescriptionContainer = styled.View`
  background-color: ${({theme}) => theme.colors.gray_03};
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ActionsContainer = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const LeaveButton = styled.TouchableOpacity`
  align-items: center;
  padding: ${verticalScale(8)}px;
`;

export const CaretButton = styled.TouchableOpacity`
  
`;