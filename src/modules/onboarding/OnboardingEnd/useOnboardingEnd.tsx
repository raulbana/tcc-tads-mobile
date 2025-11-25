import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import {useEffect, useRef} from 'react';

const useOnboardingEnd = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {setAnonymousMode, isPendingRegister, setPendingRegister} = useAuth();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!hasNavigated.current && isPendingRegister()) {
      hasNavigated.current = true;
      navigate('Auth', {screen: 'Register'});
      setTimeout(() => {
        setPendingRegister(false);
      }, 0);
    }
  }, [isPendingRegister, setPendingRegister, navigate]);

  const handleGoToRegister = async () => {
    await setAnonymousMode(false);
    navigate('Auth', {screen: 'Register'});
    setPendingRegister(false);
  };

  const handleContinueAnonymous = async () => {
    await setAnonymousMode(true);
    navigate('MainTabs');
    setPendingRegister(false);
  };

  return {
    handleGoToRegister,
    handleContinueAnonymous,
  };
};

export default useOnboardingEnd;
