import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(24)}px;
  padding: ${moderateScale(16)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(8)}px;
`;

export const CommentSectionAnchor = styled.View`
  width: 100%;
`;
