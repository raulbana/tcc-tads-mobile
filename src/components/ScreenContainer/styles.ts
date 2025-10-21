import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../utils/scales';

export const StyledContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(0)}px;
`;

export const StyledSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  padding-bottom: ${verticalScale(0)}px;
  padding-top: ${verticalScale(16)}px;
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const StyledContainerFullBleed = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

export const StyledSafeAreaFullBleed = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

export const StyledContent = styled.View`
  flex-grow: 1;
`;

export const StyledScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const StyledHeader = styled.View`
  padding-vertical: ${verticalScale(8)}px;
  width: 100%;
  align-items: flex-start;
`;

export const GoBackContainer = styled.TouchableOpacity.attrs({
  accessibilityRole: 'button',
  accessibilityLabel: 'Go back',
})`
  display: flex;
  flex-direction: row;
  gap: ${horizontalScale(8)}px;
  align-items: center;
  justify-content: center;
`;
