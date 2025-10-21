import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../utils/scales';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.gray_03};
  border-radius: ${horizontalScale(16)}px;
  padding: ${verticalScale(20)}px ${horizontalScale(16)}px;
  margin: ${verticalScale(24)}px ${horizontalScale(16)}px 0 ${horizontalScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const InfoIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  gap: ${horizontalScale(8)}px;
`;

export const Description = styled.View`
width: 100%;  
align-items: center;
`;

export const MetricsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const MetricItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(6)}px;
`;

export const StartButton = styled.View`
  margin-top: ${verticalScale(8)}px;
`;

export const CenterContainer = styled.View`
  align-items: center;
`;