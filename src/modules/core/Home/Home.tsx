import React, {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';
import * as S from './styles';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import RecommendationCard from './components/RecomendationCard/RecommendationCard';
import Label from '../../../components/Label/Label';
import TrainingSection from './components/TrainingSection/TrainingSection';
import ExerciseBlockedCard from './components/ExerciseBlockedCard';
import CalendarRow from '../../../components/Calendar/components/CalendarRow/CalendarRow';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import useHome from './useHome';
import NotificationPermissionModal from '../../../components/NotificationPermissionModal/NotificationPermissionModal';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  // Interceptar botão voltar quando estiver na home
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Se estiver na home, mostrar diálogo de confirmação para sair
        Alert.alert(
          'Sair do aplicativo',
          'Deseja realmente sair do aplicativo?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Sair',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
        return true; // Prevenir comportamento padrão
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );
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
    isExercisesBlocked,
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
        {isExercisesBlocked ? (
          <ExerciseBlockedCard />
        ) : (
          hasTrainingData && (
            <TrainingSection
              onRedirectToAllExercises={handleNavigateToAllExercises}
              exercise={workoutPlan[0]?.workouts?.[0]?.exercises?.[0]}
              onRedirectToTrainingDetails={handleNavigateToTrainingDetails}
              showBadge={false}
            />
          )
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
