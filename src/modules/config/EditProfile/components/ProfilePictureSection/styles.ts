import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../utils/scales';

export const Container = styled.View`
  align-items: center;
  gap: ${verticalScale(16)}px;
`;

export const AvatarContainer = styled.View`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(50)}px;
  align-items: center;
  justify-content: center;
  border: ${moderateScale(3)}px solid ${({theme}) => theme.colors.purple_02};
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  gap: ${horizontalScale(16)}px;
`;

export const profileImageStyle = {
  width: moderateScale(94),
  height: moderateScale(94),
  borderRadius: moderateScale(47),
};

export const actionButtonStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: horizontalScale(8),
  paddingHorizontal: horizontalScale(12),
  paddingVertical: verticalScale(8),
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: moderateScale(8),
};

export const removeButtonStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: horizontalScale(8),
  paddingHorizontal: horizontalScale(12),
  paddingVertical: verticalScale(8),
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#FF6B6B',
  borderRadius: moderateScale(8),
};
