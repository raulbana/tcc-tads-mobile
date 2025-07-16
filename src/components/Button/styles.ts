import styled from 'styled-components/native';
import {ButtonProps} from './Button';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/scales';

const getBackgroundColor = (theme: any, type: string) => {
  if (type === 'PRIMARY') {
    return theme.colors.purple_04;
  } else if (type === 'SECONDARY') {
    return theme.colors.purple_02;
  } else {
    return theme.colors.white;
  }
};

const getPadding = (size: string) => {
  if (size === 'SMALL') {
    return `${verticalScale(8)}px ${horizontalScale(12)}px`;
  } else if (size === 'MEDIUM') {
    return `${verticalScale(12)}px ${horizontalScale(16)}px`;
  } else {
    return `${verticalScale(16)}px ${horizontalScale(32)}px`;
  }
};

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({theme, type}) => getBackgroundColor(theme, type)};
  padding: ${({size}) => getPadding(size)};
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
