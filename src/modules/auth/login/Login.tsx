import React from 'react';
import {TouchableOpacity} from 'react-native';
import LoginForm from './components/LoginForm/LoginForm';
import DailyIULogo from '../../../assets/illustrations/daily-iu-logo.svg';
import * as S from './styles';
import useLogin from './useLogin';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';

const Login: React.FC = () => {
  const {handleGoToRegister, handleGoToForgotPassword, handleSkipLogin} =
    useLogin();

  const theme = useDynamicTheme();

  return (
    <ScreenContainer>
      <S.Outer>
        <S.LogoWrapper>
          <DailyIULogo width={48} height={48} />
          <Label
            typography={theme.typography.title.b2}
            text="DailyIU"
            color={theme.colors.gray_08}
          />
        </S.LogoWrapper>

        <Label
          text="Entrar na sua conta"
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          style={{marginHorizontal: 'auto'}}
        />

        <LoginForm />
        <S.FooterRow>
          <Label
            text="Ainda não tem conta?"
            color={theme.colors.gray_06}
            typography={theme.typography.paragraph.sm3}
          />
          <TouchableOpacity onPress={handleGoToRegister}>
            <Label
              text=" Criar Conta"
              color={theme.colors.purple_04}
              typography={theme.typography.paragraph.sm3}
            />
          </TouchableOpacity>
        </S.FooterRow>
        <S.FooterRow>
          <TouchableOpacity onPress={handleGoToForgotPassword}>
            <Label
              text="Esqueceu a senha?"
              color={theme.colors.purple_04}
              typography={theme.typography.paragraph.sm3}
            />
          </TouchableOpacity>
        </S.FooterRow>
        <S.FooterRow>
          <TouchableOpacity onPress={handleSkipLogin}>
            <Label
              text="Seguir sem login"
              color={theme.colors.purple_04}
              typography={theme.typography.paragraph.sm3}
            />
          </TouchableOpacity>
        </S.FooterRow>
      </S.Outer>
    </ScreenContainer>
  );
};

export default Login;
