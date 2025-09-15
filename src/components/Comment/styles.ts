import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${horizontalScale(12)}px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.colors.gray_03};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const Avatar = styled.Image`
  width: ${horizontalScale(36)}px;
  height: ${verticalScale(36)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({theme}) => theme.colors.gray_03};
`;

export const Content = styled.View`
  flex: 1;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(16)}px;
`;

export const IconButton = styled.TouchableOpacity`
  margin-left: auto;
  padding: ${verticalScale(4)}px;
`;

export const ActionsRow = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(8)}px;
  align-items: center;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(4)}px;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${horizontalScale(6)}px;
  align-items: center;
  padding-vertical: ${verticalScale(4)}px;
`;

export const RepliesContainer = styled.View`
  width: 100%;
  margin-top: ${verticalScale(8)}px;
  gap: ${verticalScale(16)}px;
  border-left-width: ${horizontalScale(2)}px;
  border-left-color: ${({theme}) => theme.colors.gray_04};
  padding-left: ${horizontalScale(8)}px;
`;

export const ReplyToggleContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

export const ReplyToggleButton = styled.TouchableOpacity``;

export const ReplyTextInput = styled.TextInput`
  flex: 1;
  min-height: ${verticalScale(40)}px;
  max-height: ${verticalScale(120)}px;
  padding: ${moderateScale(8)}px;
  background-color: ${({theme}) => theme.colors.white};
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.gray_04};
  border-radius: ${moderateScale(8)}px;
  color: ${({theme}) => theme.colors.gray_08};
  font-size: ${moderateScale(14)}px;
  font-family: ${({theme}) => theme.typography.paragraph.r2.fontFamily};
`;
