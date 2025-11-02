import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  padding: 24px;
`;

export const Header = styled.View`
  margin-bottom: 16px;
`;

export const DescriptionContainer = styled.View`
  margin-bottom: 32px;
`;

export const CardContainer = styled.View`
  gap: 24px;
`;

export const Card = styled.View`
  background-color: ${({theme}) => theme.colors.gray_01};
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${({theme}) => theme.colors.gray_03};
`;

export const CardHeader = styled.View`
  margin-bottom: 16px;
`;

export const CardContent = styled.View`
  margin-bottom: 20px;
  gap: 12px;
`;

export const BenefitItem = styled.View`
  margin-bottom: 8px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
`;

