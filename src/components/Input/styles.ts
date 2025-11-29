import styled from 'styled-components/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/scales';

export const InputContainer = styled.View<{
  disabled?: boolean;
  error?: boolean;
}>`
  width: 100%;
  background-color: ${({theme}) => theme.colors.gray_01};
  border: ${moderateScale(2)}px solid
    ${({theme, error}) => (error ? theme.colors.error : theme.colors.gray_04)};
  border-radius: ${moderateScale(10)}px;
  padding: ${verticalScale(12)}px ${horizontalScale(16)}px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  margin-top: ${horizontalScale(4)}px;
`;

export const StyledInput = styled.TextInput.attrs<{theme: any}>(({theme}) => ({
  placeholderTextColor: theme.colors.gray_06,
}))`
  font-size: ${moderateScale(14)}px;
  color: ${({theme}) => theme.colors.gray_08};
  width: 100%;
  padding: 0;
`;

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${verticalScale(4)}px;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CharCounter = styled.Text<{color: string}>`
  font-size: ${({theme}) => theme.typography.paragraph.sm1.fontSize}px;
  font-family: ${({theme}) => theme.typography.paragraph.sm1.fontFamily};
  font-weight: ${({theme}) => theme.typography.paragraph.sm1.fontWeight};
  color: ${({color}) => color};
  margin-left: auto;
`;
