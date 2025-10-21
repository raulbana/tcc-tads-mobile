import styled from 'styled-components/native';

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Spinner = styled.ActivityIndicator.attrs(({theme}) => ({
  size: 'large',
  color: theme.colors.purple_04,
}))``;
