import * as S from './style';

import ProgressBarStepped from '../../../components/ProgressBarStepped/ProgressBarStepped';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';

const Home = () => {
  return (
    <ScreenContainer>
      <S.Container>
        <ProgressBarStepped steps={5} currentStep={5} />
      </S.Container>
    </ScreenContainer>
  );
};

export default Home;
