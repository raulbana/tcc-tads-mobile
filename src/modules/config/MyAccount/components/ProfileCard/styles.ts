import styled from 'styled-components/native';
import theme from '../../../../../theme/theme';

export const Container = styled.View`
  background-color: ${theme.colors.gray_02};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid ${theme.colors.gray_04};
`;

export const Section = styled.View`
  margin-bottom: 16px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.gray_04};
  margin: 8px 0;
`;

export const AvatarCircle = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.colors.gray_03};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const profileImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
};

export const editButtonStyle = {
  padding: 8,
  alignSelf: 'flex-start',
};
