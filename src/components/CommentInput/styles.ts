import styled from 'styled-components/native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scales';

export interface ContainerProps {
  row?: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: ${({row}) => (row ? 'row' : 'column')};
  display: flex;
  width: 100%;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.gray_04};
  border-radius: ${moderateScale(12)}px;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${verticalScale(8)}px ${horizontalScale(12)}px;
  gap: ${horizontalScale(8)}px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${moderateScale(15)}px;
  color: ${({theme}) => theme.colors.gray_08};
  padding: 0;
  min-height: ${verticalScale(32)}px;
  max-height: ${verticalScale(64)}px;
`;

export const SendButton = styled.TouchableOpacity<{
  disabled?: boolean;
}>`
  flex: 1;
  background-color: ${({disabled, theme}) =>
    disabled ? theme.colors.gray_04 : theme.colors.purple_04};
  border-radius: ${moderateScale(8)}px;
  padding: ${verticalScale(6)}px ${horizontalScale(16)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;
