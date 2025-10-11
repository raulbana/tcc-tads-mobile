import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../utils/scales';
import theme from '../../theme/theme';

export const Container = styled.View`
  background-color: ${theme.colors.gray_03};
  border-radius: ${horizontalScale(16)}px;
  padding: ${verticalScale(20)}px ${horizontalScale(16)}px;
  margin: ${verticalScale(24)}px ${horizontalScale(16)}px 0;
  gap: ${verticalScale(16)}px;
`;

export const InfoIconContainer = styled.View`
  align-self: center;
  width: ${horizontalScale(24)}px;
  height: ${horizontalScale(24)}px;
  border-radius: ${horizontalScale(12)}px;
  background-color: ${theme.colors.purple_04};
  align-items: center;
  justify-content: center;
`;

export const Description = styled.View`
  align-items: center;
`;

export const MetricsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MetricItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(6)}px;
`;

export const StartButton = styled.View`
  margin-top: ${verticalScale(8)}px;
`;
