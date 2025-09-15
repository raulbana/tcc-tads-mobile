import styled from 'styled-components/native';
import {verticalScale} from '../../utils/scales';

export const Container = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.gray_04};
  padding-top: ${verticalScale(16)}px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ReplyInputWrapper = styled.View`
  margin-bottom: ${verticalScale(12)}px;
  gap: ${verticalScale(4)}px;
`;

export const CancelReplyButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: ${verticalScale(2)}px;
`;