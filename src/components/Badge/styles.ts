import styled from 'styled-components/native';
import {BadgeProps} from './Badge';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const BadgeContainer = styled.TouchableOpacity<BadgeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor || theme.colors.gray_03};
  border-radius: ${moderateScale(8)}px;
  padding: ${verticalScale(4)}px ${horizontalScale(8)}px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  min-height: ${verticalScale(24)}px;
  flex-shrink: 0;
`;
