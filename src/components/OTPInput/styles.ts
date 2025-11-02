import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';
import {TextInput} from 'react-native';

export const Wrapper = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${horizontalScale(12)}px;
`;

export const Input = styled(TextInput)<{
  $isFocused: boolean;
  $hasError: boolean;
}>`
  width: ${horizontalScale(36)}px;
  height: ${verticalScale(36)}px;
  border-radius: ${moderateScale(10)}px;
  border: ${moderateScale(2)}px solid ${({theme}) => theme.colors.gray_04};
  border-color: ${({$isFocused, $hasError, theme}) =>
    $hasError
      ? theme.colors.error
      : $isFocused
      ? theme.colors.purple_03
      : theme.colors.gray_04};
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: ${moderateScale(12)}px;
`;
