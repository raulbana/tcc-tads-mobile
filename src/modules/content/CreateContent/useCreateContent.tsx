import { useNavigation } from "@react-navigation/native";
import { NavigationStackProp } from "../../../navigation/routes";

const useCreateContent = () => {
  const navigation = useNavigation<NavigationStackProp>();

  const goBack = () => {
    navigation.navigate('MainTabs', {screen: 'Contents'});
  };

  return {goBack};
};

export default useCreateContent;