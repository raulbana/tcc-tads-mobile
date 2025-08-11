import styled from 'styled-components/native';
import {verticalScale} from '../../../../utils/scales';

export const ItemButton = styled.TouchableOpacity<{focused:boolean}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(4)}px;
  padding-vertical: ${verticalScale(4)}px;
`;