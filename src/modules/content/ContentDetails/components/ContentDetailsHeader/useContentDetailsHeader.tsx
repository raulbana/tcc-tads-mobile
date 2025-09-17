import {useNavigation} from '@react-navigation/native';

const useContentDetailsHeader = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return {goBack};
};

export default useContentDetailsHeader;
