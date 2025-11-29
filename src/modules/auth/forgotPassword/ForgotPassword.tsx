import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import ForgotPasswordRequestForm from './components/ForgotPasswordRequestForm/ForgotPasswordRequestForm';
import ForgotPasswordVerifyForm from './components/ForgotPasswordVerifyForm/ForgotPasswordVerifyForm';
import useForgotPassword from './useForgotPassword';
import DailyIULogo from '../../../assets/illustrations/daily-iu-logo.svg';
import * as S from './styles';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';
const ForgotPassword: React.FC = () => {
  const {step, email, onRequestSuccess, onVerifySuccess, goBack, setStep} =
    useForgotPassword();

  const theme = useDynamicTheme();

  return (
    <ScreenContainer currentPage="Esqueceu sua senha?" goBack={goBack}>
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
          text="Esqueci minha senha"
        />
        {step === 'request' && (
          <ForgotPasswordRequestForm onSuccess={onRequestSuccess} />
        )}
        {step === 'verify' && (
          <ForgotPasswordVerifyForm
            email={email}
            onSuccess={onVerifySuccess}
            onBack={() => setStep('request')}
          />
        )}
      </S.Outer>
    </ScreenContainer>
  );
};

export default ForgotPassword;
