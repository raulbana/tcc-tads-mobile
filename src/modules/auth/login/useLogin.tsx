import {useNavigation} from '@react-navigation/native';
import { NavigationStackProp } from '../../../navigation/routes';

const useLogin = () => {
  const {navigate} = useNavigation<NavigationStackProp>();

  const handleGoToRegister = () => {
    navigate('Auth', {screen: 'Register'});
  };

  return {handleGoToRegister};
};

export default useLogin;
