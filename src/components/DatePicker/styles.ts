import styled from 'styled-components/native';
import {verticalScale} from '../../utils/scales';

export const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${verticalScale(12)}px;
  justify-content: center;
  align-items: center;
`;

export const InputPressable = styled.TouchableOpacity`
  width: 100%;
`;