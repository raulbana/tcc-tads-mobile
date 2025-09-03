import styled from 'styled-components/native';
import { horizontalScale } from '../../../../../../utils/scales';

interface SettingItemProps {
  isLastItem: boolean;
}

export const Item = styled.View<SettingItemProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme, isLastItem}) =>
    isLastItem ? 'transparent' : theme.colors.gray_04};
  padding-horizontal: ${horizontalScale(8)}px;
`;
