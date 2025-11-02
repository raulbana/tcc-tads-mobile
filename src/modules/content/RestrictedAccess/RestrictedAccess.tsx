import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import * as S from './styles';

const RestrictedAccess: React.FC = () => {
  const theme = useDynamicTheme();
  const {navigate} = useNavigation<NavigationStackProp>();

  const handleGoToRegister = () => {
    navigate('Auth', {screen: 'Register'});
  };

  const handleGoToLogin = () => {
    navigate('Auth', {screen: 'Login'});
  };

  return (
    <ScreenContainer scrollable>
      <S.Wrapper>
        <S.IconContainer>
          <Icon name="Lock" size={64} color={theme.colors.purple_04} />
        </S.IconContainer>

        <S.Title>
          <Label
            typography={theme.typography.title.b2}
            color={theme.colors.gray_08}
            text="Acesso Restrito"
          />
        </S.Title>

        <S.Description>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_06}
            text="Para acessar o módulo de conteúdos (rede social), você precisa estar cadastrado e logado no aplicativo."
            textAlign="center"
          />
        </S.Description>

        <S.Description>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_06}
            text="Faça seu cadastro ou faça login para continuar explorando todos os recursos disponíveis."
            textAlign="center"
          />
        </S.Description>

        <S.ButtonContainer>
          <Button
            type="PRIMARY"
            text="Fazer Cadastro"
            onPress={handleGoToRegister}
          />
        </S.ButtonContainer>

        <S.ButtonContainer>
          <Button
            type="SECONDARY"
            text="Fazer Login"
            onPress={handleGoToLogin}
          />
        </S.ButtonContainer>
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default RestrictedAccess;
