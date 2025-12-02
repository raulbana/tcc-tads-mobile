import styled from 'styled-components/native';
import {
  horizontalScale,
  verticalScale,
} from '../../../utils/scales';

export const Container = styled.View`
  width: 100%;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
  gap: ${verticalScale(24)}px;
`;

export const Header = styled.View`
  width: 100%;
  margin-bottom: ${verticalScale(8)}px;
`;

export const Content = styled.View`
  width: 100%;
  gap: ${verticalScale(24)}px;
`;

export const Section = styled.View`
  width: 100%;
  gap: ${verticalScale(12)}px;
`;

export const FeatureList = styled.View`
  width: 100%;
  gap: ${verticalScale(8)}px;
  padding-left: ${horizontalScale(8)}px;
`;

export const FeatureItem = styled.View`
  width: 100%;
`;
