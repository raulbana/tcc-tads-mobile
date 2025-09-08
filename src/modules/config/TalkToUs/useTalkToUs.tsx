import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const useTalkToUs = () => {
  const {navigate} = useNavigation<NavigationStackProp>();

  const onGoBack = () => {
    navigate('MainTabs', {screen: 'MyAccount'});
  };
  return {
    onGoBack,
  };
};

export default useTalkToUs;
