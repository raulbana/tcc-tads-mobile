import * as S from './styles';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import RecommendationCard from './components/RecomendationCard/RecommendationCard';
import Label from '../../../components/Label/Label';
import TrainingSection from './components/TrainingSection/TrainingSection';
import CalendarRow from '../../../components/Calendar/components/CalendarRow/CalendarRow';
import { useAuth } from '../../../contexts/AuthContext';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

const Home = () => {

  const {user} = useAuth();
  const theme = useDynamicTheme();

  return (
    <ScreenContainer>
      <S.Container>
        <Label
          typography={theme.typography.title.sb3}
          color={theme.colors.gray_08}
          text={`Olá, ${user?.name}!`}
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
