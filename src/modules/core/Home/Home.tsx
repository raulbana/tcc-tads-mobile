import * as S from './styles';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import RecommendationCard from './components/RecomendationCard/RecommendationCard';
import Label from '../../../components/Label/Label';
import theme from '../../../theme/theme';
import TrainingSection from './components/TrainingSection/TrainingSection';
import CalendarRow from '../../../components/Calendar/components/CalendarRow/CalendarRow';

const Home = () => {
  return (
    <ScreenContainer>
      <S.Container>
        <Label
          typography={theme.typography.title.sb3}
          color={theme.colors.gray_08}
          text={`Bem vinda Maria!`}
        />
        <CalendarRow />
        <RecommendationCard
          onButtonClick={() => {}}
          title="Recomendações"
          description="Verificamos os seus hábitos e sugerimos melhorias."
          buttonLabel="Ver Mais"
        />
        <TrainingSection onRedirectToTrainingDetails={() => {}} />
      </S.Container>
    </ScreenContainer>
  );
};

export default Home;
