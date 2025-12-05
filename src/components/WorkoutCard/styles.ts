import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const Container = styled.View<{isNextWorkout?: boolean}>`
  background-color: ${({theme, isNextWorkout}) =>
    isNextWorkout ? theme.colors.purple_01 || '#F3E8FF' : theme.colors.gray_03};
  border-radius: ${moderateScale(16)}px;
  padding: ${verticalScale(20)}px ${horizontalScale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
  border-width: ${({isNextWorkout}) => (isNextWorkout ? 2 : 0)}px;
  border-color: ${({theme, isNextWorkout}) =>
    isNextWorkout ? theme.colors.purple_02 || '#9657B3' : 'transparent'};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(12)}px;
`;

export const TitleContainer = styled.View`
  flex: 1;
  margin-right: ${horizontalScale(12)}px;
`;

export const BadgeContainer = styled.View`
  align-items: flex-end;
`;

export const Badge = styled.View`
  background-color: ${({theme}) => theme.colors.purple_02};
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(4)}px ${horizontalScale(8)}px;
`;

export const MetadataRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${horizontalScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const MetadataItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${horizontalScale(4)}px;
  margin-bottom: ${verticalScale(8)}px;
  flex-shrink: 0;
`;

export const DescriptionContainer = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
`;
