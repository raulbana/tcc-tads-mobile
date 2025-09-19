import React from 'react';
import ScreenContainer from '../../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../../components/Label/Label';
import RegisterForm from './components/RegisterForm/RegisterForm';
import * as S from './styles';
import DailyIULogo from '../../../../assets/illustrations/daily-iu-logo.svg';
import theme from '../../../../theme/theme';
import useRegister from './useRegister';

const Register: React.FC = () => {
  const {handleGoToLogin} = useRegister();

  return (
    <ScreenContainer safeArea>
      <S.Outer>
        <S.LogoWrapper>
          <DailyIULogo width={48} height={48} />
          <Label
            typography={theme.typography.title.m3}
            color={theme.colors.gray_08}
            text="DailyIU"
          />
        </S.LogoWrapper>

        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          text="Criar sua conta"
        />
        <RegisterForm />
        <S.SeparatorRow>
          <S.Line />
          <Label
            text="ou"
            color={theme.colors.gray_07}
            typography={theme.typography.paragraph.sm3}
          />
          <S.Line />
        </S.SeparatorRow>

        <S.FooterRow>
          <Label
            text="Já tem conta?"
            color={theme.colors.gray_07}
            typography={theme.typography.paragraph.sm3}
          />
          <S.LinkPressable onPress={handleGoToLogin}>
            <Label
              text=" Entrar"
              color={theme.colors.purple_04}
              typography={theme.typography.paragraph.sm3}
            />
          </S.LinkPressable>
        </S.FooterRow>
      </S.Outer>
    </ScreenContainer>
  );
};

export default Register;
