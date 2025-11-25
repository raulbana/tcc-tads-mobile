import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const useRegister = () => {
  const {navigate} = useNavigation<NavigationStackProp>();

  const handleGoToLogin = () => {
    navigate('Auth', {screen: 'Login'});
  };

  return {handleGoToLogin};
};

export default useRegister;
