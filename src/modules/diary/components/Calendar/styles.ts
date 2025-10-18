import styled from 'styled-components/native';
import {horizontalScale, verticalScale} from '../../../../utils/scales';

export const Container = styled.View`
  flex-direction: column;
  gap: ${verticalScale(12)}px;
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const NavButton = styled.TouchableOpacity`
  padding: ${verticalScale(8)}px;
`;

export const Grid = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
`;

export const Row = styled.View<{$center?: boolean}>`
  width: 100%;
  flex-direction: row;
  gap: ${horizontalScale(8)}px;
`;

export const DeleteModalContent = styled.View`
  flex-direction: column;
  gap: ${verticalScale(12)}px;
`;

export const DeleteModalTitle = styled.View`
  align-items: center;
  justify-content: center;
`;