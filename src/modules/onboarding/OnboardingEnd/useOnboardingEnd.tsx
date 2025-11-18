import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import {useEffect, useRef} from 'react';

const useOnboardingEnd = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {setAnonymousMode, isPendingRegister, setPendingRegister} = useAuth();
  const hasNavigated = useRef(false);

  // Se veio do fluxo de registro, navega automaticamente para registro
  useEffect(() => {
    if (!hasNavigated.current && isPendingRegister()) {
      hasNavigated.current = true;
      setPendingRegister(false);
      navigate('Auth', {screen: 'Register'});
    }
  }, [isPendingRegister, setPendingRegister, navigate]);

  const handleGoToRegister = async () => {
    await setAnonymousMode(false);
    await setPendingRegister(false);
    navigate('Auth', {screen: 'Register'});
  };

  const handleContinueAnonymous = async () => {
    await setAnonymousMode(true);
    await setPendingRegister(false);
    navigate('MainTabs');
  };

  return {
    handleGoToRegister,
    handleContinueAnonymous,
  };
};

export default useOnboardingEnd;

