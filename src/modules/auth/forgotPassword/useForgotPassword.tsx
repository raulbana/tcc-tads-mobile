import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {NavigationStackProp} from '../../../navigation/routes';

type ForgotPasswordStep = 'request' | 'verify';

const useForgotPassword = () => {
  const [step, setStep] = useState<ForgotPasswordStep>('request');
  const {navigate} = useNavigation<NavigationStackProp>();

  const onRequestSuccess = () => {
    setStep('verify');
  };

  const onVerifySuccess = () => {
    setStep('request');
    navigate('Auth', {screen: 'Login'});
  };

  const goBack = () => {
    navigate('Auth', {screen: 'Login'});
  };

  return {step, onRequestSuccess, onVerifySuccess, goBack, setStep};
};

export default useForgotPassword;
