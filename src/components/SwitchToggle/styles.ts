import styled from 'styled-components/native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/scales';
import Animated from 'react-native-reanimated';

export const Container = styled.TouchableOpacity`
  width: ${horizontalScale(32)}px;
  height: ${verticalScale(32)}px;
  justify-content: center;
  align-items: center;
`;

export const Track = styled.View<{$checked: boolean; $disabled?: boolean}>`
  width: 100%;
  height: ${verticalScale(16)}px;
  border-radius: ${verticalScale(8)}px;
  background-color: ${({$checked, $disabled, theme}) =>
    $disabled
      ? theme.colors.gray_04
      : $checked
      ? theme.colors.purple_02
      : theme.colors.gray_02};
  transition: background-color 200ms;
  justify-content: center;
`;

export const Thumb = styled(Animated.View)<{
  $checked: boolean;
  $disabled?: boolean;
}>`
  left: ${({$checked}) =>
    $checked ? horizontalScale(16) : horizontalScale(0)}px;
  width: ${horizontalScale(20)}px;
  height: ${verticalScale(20)}px;
  border-radius: ${verticalScale(12)}px;
  background-color: ${({$checked, $disabled, theme}) =>
    $disabled
      ? theme.colors.gray_05
      : $checked
      ? theme.colors.purple_03
      : theme.colors.gray_04};
  border-width: ${moderateScale(2)}px;
  border-color: ${({$checked, theme}) =>
    $checked ? theme.colors.purple_03 : theme.colors.gray_04};
  box-shadow: 0px ${moderateScale(2)}px ${moderateScale(4)}px
    rgba(0, 0, 0, 0.08);
  transition: left 200ms, background-color 200ms;
`;
