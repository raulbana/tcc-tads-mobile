import styled from 'styled-components/native';
import {moderateScale, verticalScale} from '../../../utils/scales';

export const Wrapper = styled.View`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CreatePostButton = styled.TouchableOpacity`
  border: 2px solid ${({theme}) => theme.colors.gray_08};
  border-radius: ${moderateScale(8)}px;
`;

export const FilteredList = styled.View`
  width: 100%;
  gap: ${verticalScale(16)}px;
`;
