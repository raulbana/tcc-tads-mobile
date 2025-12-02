import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';

const useLogin = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {user, hasOnboardingData, setPendingRegister} = useAuth();

  const handleGoToRegister = () => {
    if (hasOnboardingData()) {
      navigate('Auth', {screen: 'Register'});
    } else {
      setPendingRegister(true);
      navigate('Onboarding', {screen: 'OnboardingHome'});
    }
  };

  const handleGoToForgotPassword = () => {
    navigate('Auth', {screen: 'ForgotPassword'});
  };

  const handleSkipLogin = () => {
    if (user?.profile) {
      navigate('MainTabs');
    } else {
      navigate('Onboarding');
    }
  };

  return {handleGoToRegister, handleGoToForgotPassword, handleSkipLogin};
};

export default useLogin;
