import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

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
  padding: 16px;
`;

export const StyledScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})``;
