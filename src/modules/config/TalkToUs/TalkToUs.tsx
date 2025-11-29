import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import TalkToUsForm from './components/TalkToUsForm/TalkToUsForm';
import * as S from './styles';
import useTalkToUs from './useTalkToUs';

const TalkToUs = () => {
  const {onGoBack} = useTalkToUs();

  return (
    <ScreenContainer
      headerShown
      goBack={onGoBack}
      goBackTo="Minha Conta"
      scrollable>
      <S.Container>
        <TalkToUsForm />
      </S.Container>
    </ScreenContainer>
  );
};

export default TalkToUs;
