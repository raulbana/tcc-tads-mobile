import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import {ButtonProps, ButtonSize, ButtonType} from './Button';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/scales';

const getPadding = (size?: ButtonSize) => {
  if (size === 'SMALL') {
    return `${verticalScale(8)}px ${horizontalScale(12)}px`;
  } else if (size === 'MEDIUM') {
    return `${verticalScale(12)}px ${horizontalScale(16)}px`;
  } else {
    return `${verticalScale(16)}px ${horizontalScale(32)}px`;
  }
};

interface ButtonContainerProps extends ButtonProps {
  backgroundColor: string;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background-color: ${({backgroundColor}) => backgroundColor};
  padding: ${({size}) => getPadding(size)};
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${horizontalScale(8)}px;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-right: ${horizontalScale(4)}px;
`;
