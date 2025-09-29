import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const useLogin = () => {
  const {navigate} = useNavigation<NavigationStackProp>();

  const handleGoToRegister = () => {
    navigate('Auth', {screen: 'Register'});
  };

  const handleGoToForgotPassword = () => {
    navigate('Auth', {screen: 'ForgotPassword'});
  };

  return {handleGoToRegister, handleGoToForgotPassword};
};

export default useLogin;
