import styled from 'styled-components/native';
import {BadgeProps} from './Badge';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const BadgeContainer = styled.TouchableOpacity<BadgeProps>`
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor || theme.colors.gray_03};
  border-radius: ${moderateScale(8)}px;
  padding: ${verticalScale(4)}px ${horizontalScale(12)}px;
`;
