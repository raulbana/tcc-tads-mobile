import React, {useEffect, useRef} from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';
import * as S from './styles';
import DailyIULogo from '../../../assets/illustrations/daily-iu-logo.svg';
import useRegister from './useRegister';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import {useAuth} from '../../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const Register: React.FC = () => {
  const {handleGoToLogin} = useRegister();
  const {hasOnboardingData, setPendingRegister, isPendingRegister} = useAuth();
  const {navigate} = useNavigation<NavigationStackProp>();
  const theme = useDynamicTheme();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (!hasChecked.current && !hasOnboardingData() && !isPendingRegister()) {
      hasChecked.current = true;
      setPendingRegister(true);
      navigate('Onboarding', {screen: 'OnboardingHome'});
    }
    if (hasChecked.current && !isPendingRegister() && hasOnboardingData()) {
      hasChecked.current = false;
    }
  }, [hasOnboardingData, setPendingRegister, navigate, isPendingRegister]);

  return (
    <ScreenContainer scrollable>
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
