import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  gap: ${verticalScale(12)}px;
`;

export const ListContainer = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
`;

export const ListItem = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  gap: ${horizontalScale(8)}px;
  align-items: center;
`;
