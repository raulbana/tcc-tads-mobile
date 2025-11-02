import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';

const useOnboardingEnd = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {setAnonymousMode} = useAuth();

  const handleGoToRegister = async () => {
    await setAnonymousMode(false);
    navigate('Auth', {screen: 'Register'});
  };

  const handleContinueAnonymous = async () => {
    await setAnonymousMode(true);
    navigate('MainTabs');
  };

  return {
    handleGoToRegister,
    handleContinueAnonymous,
  };
};

export default useOnboardingEnd;

