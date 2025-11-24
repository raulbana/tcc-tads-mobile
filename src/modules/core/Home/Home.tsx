import * as S from './styles';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import RecommendationCard from './components/RecomendationCard/RecommendationCard';
import Label from '../../../components/Label/Label';
import TrainingSection from './components/TrainingSection/TrainingSection';
import CalendarRow from '../../../components/Calendar/components/CalendarRow/CalendarRow';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import useHome from './useHome';
import NotificationPermissionModal from '../../../components/NotificationPermissionModal/NotificationPermissionModal';

const Home = () => {
  const theme = useDynamicTheme();
  const {
    handleNavigateToDiary,
    handleNavigateToTrainingDetails,
    hasDiaryEntriesToday,
    hasTrainingData,
    workoutPlan,
    handleNavigateToAllExercises,
    titleText,
    notificationModalVisible,
    hideNotificationModal,
  } = useHome();
  return (
    <ScreenContainer>
      <S.Container>
        <Label
          typography={theme.typography.title.sb3}
          color={theme.colors.gray_08}
          text={titleText}
        />
        <CalendarRow />
        {!hasDiaryEntriesToday && (
          <RecommendationCard
            onButtonClick={handleNavigateToDiary}
            title="Recomendações"
            description="Não realizou anotações em seu diário hoje? Revise as suas anotações para manter o controle de sua saúde."
            buttonLabel="Meu diário"
          />
        )}
        {hasTrainingData && (
          <TrainingSection
            onRedirectToAllExercises={handleNavigateToAllExercises}
            exercise={workoutPlan[0]?.workouts?.[0]?.exercises?.[0]}
            onRedirectToTrainingDetails={handleNavigateToTrainingDetails}
            showBadge={false}
          />
        )}
      </S.Container>
      <NotificationPermissionModal
        visible={notificationModalVisible}
        onClose={hideNotificationModal}
      />
    </ScreenContainer>
  );
};

export default Home;
