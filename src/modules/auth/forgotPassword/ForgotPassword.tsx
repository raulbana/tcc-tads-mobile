import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import theme from '../../../theme/theme';
import ForgotPasswordRequestForm from './components/ForgotPasswordRequestForm/ForgotPasswordRequestForm';
import ForgotPasswordVerifyForm from './components/ForgotPasswordVerifyForm/ForgotPasswordVerifyForm';
import useForgotPassword from './useForgotPassword';
import DailyIULogo from '../../../assets/illustrations/daily-iu-logo.svg';
import * as S from './styles';
const ForgotPassword: React.FC = () => {
  const {step, onRequestSuccess, onVerifySuccess, goBack, setStep} =
    useForgotPassword();

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
            onSuccess={onVerifySuccess}
            onBack={() => setStep('request')}
          />
        )}
      </S.Outer>
    </ScreenContainer>
  );
};

export default ForgotPassword;
