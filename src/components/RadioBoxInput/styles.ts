import styled from 'styled-components/native';
import {
  horizontalScale,
  verticalScale,
} from '../../utils/scales';

export const Wrapper = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
`;

export const OptionsContainer = styled.View<{$columns?: number}>`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${horizontalScale(12)}px;
`;