import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  padding: ${verticalScale(16)}px ${horizontalScale(16)}px;
`;

export const Header = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const DescriptionContainer = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const CardContainer = styled.View`
  gap: ${verticalScale(24)}px;
`;

export const Card = styled.View`
  background-color: ${({theme}) => theme.colors.gray_01};
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(20)}px ${horizontalScale(20)}px;
  border: ${moderateScale(1)}px solid ${({theme}) => theme.colors.gray_03};
`;

export const CardHeader = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const CardContent = styled.View`
  margin-bottom: ${verticalScale(16)}px;
  gap: ${verticalScale(12)}px;
`;

export const BenefitItem = styled.View`
  margin-bottom: ${verticalScale(8)}px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
`;
