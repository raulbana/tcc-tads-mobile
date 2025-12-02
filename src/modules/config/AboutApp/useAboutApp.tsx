import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const useAboutApp = () => {
  const {goBack} = useNavigation<NavigationStackProp>();

  const onGoBack = () => {
    goBack();
  };

  return {
    onGoBack,
  };
};

export default useAboutApp;
