import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';

const useOnboardingHome = () => {
  const navigation = useNavigation<NavigationStackProp>();

  const navigateToQuestionnaire = () => {
    navigation.navigate('Onboarding', {screen: 'OnboardingQuestion'});
  };
  return {navigateToQuestionnaire};
};
export default useOnboardingHome;
