import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const StyledContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const StyledSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

export const StyledContent = styled.View`
  flex-grow: 1;
  padding: ${moderateScale(16)}px;
`;

export const StyledScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: moderateScale(16),
  },
})``;

export const StyledHeader = styled.View`
  padding-horizontal: ${horizontalScale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
