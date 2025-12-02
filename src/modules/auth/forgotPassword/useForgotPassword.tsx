import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {NavigationStackProp} from '../../../navigation/routes';

type ForgotPasswordStep = 'request' | 'verify';

const useForgotPassword = () => {
  const [step, setStep] = useState<ForgotPasswordStep>('request');
  const [email, setEmail] = useState<string>('');
  const {navigate} = useNavigation<NavigationStackProp>();

  const onRequestSuccess = (requestEmail: string) => {
    setEmail(requestEmail);
    setStep('verify');
  };

  const onVerifySuccess = () => {
    setStep('request');
    setEmail('');
    navigate('Auth', {screen: 'Login'});
  };

  const goBack = () => {
    setEmail('');
    navigate('Auth', {screen: 'Login'});
  };

  return {step, email, onRequestSuccess, onVerifySuccess, goBack, setStep};
};

export default useForgotPassword;
