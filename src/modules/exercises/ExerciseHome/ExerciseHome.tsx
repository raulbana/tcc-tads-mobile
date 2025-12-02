import React from 'react';
import {FlatList} from 'react-native';
import * as S from './styles';
import useExerciseHome from './useExerciseHome';
import WorkoutCard from '../../../components/WorkoutCard/WorkoutCard';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import {Exercise, ExerciseStatusLabels} from '../../../types/exercise';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import Icon from '../../../components/Icon/Icon';
import ICIQReassessmentModal from './components/ICIQReassessmentModal';

const ExerciseHome = () => {
  const {
    workouts,
    handleWorkoutPress,
    isLoading,
    error,
    isExercisesBlocked,
    isReassessmentModalOpen,
    handleCloseReassessmentModal,
    handleReassessmentSuccess,
  } = useExerciseHome();

  const renderWorkoutCard = ({item}: {item: Exercise}) => {
    const statusLabel = ExerciseStatusLabels[item.status];
    return (
      <WorkoutCard
        title={item.title}
        duration={item.duration}
        category={item.category}
        difficulty={statusLabel}
        description={item.description}
        badge={statusLabel}
        onPress={() => handleWorkoutPress(item.id)}
        disabled={isExercisesBlocked}
      />
    );
  };

  const theme = useDynamicTheme();

  if (isExercisesBlocked) {
    return (
      <ScreenContainer scrollable>
        <S.RestrictedWrapper>
          <S.IconContainer>
            <Icon name="Lock" size={64} color={theme.colors.error} />
          </S.IconContainer>

          <S.Title>
            <Label
              typography={theme.typography.title.b2}
              color={theme.colors.gray_08}
              text="Acesso Restrito"
            />
          </S.Title>

          <S.Description>
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_06}
              text="Com base nas suas respostas ao questionário, identificamos que você possui uma condição grave ou muito grave de incontinência urinária."
              textAlign="center"
            />
          </S.Description>

          <S.Description>
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_06}
              text="Por conta da sua condição, recomendamos fortemente que você consulte um médico antes de realizar exercícios de fisioterapia pélvica. O acompanhamento profissional é essencial para garantir sua segurança e o melhor tratamento."
              textAlign="center"
            />
          </S.Description>

          <S.Description>
            <Label
              typography={theme.typography.paragraph.sb2}
              color={theme.colors.error}
              text="O módulo de exercícios está bloqueado até que você consulte um profissional de saúde."
              textAlign="center"
            />
          </S.Description>
        </S.RestrictedWrapper>
      </ScreenContainer>
    );
  }

  return (
    <>
      <ScreenContainer scrollable>
        <S.Container>
          <Label
            text="Plano de Treinos"
            typography={theme.typography.title.b2}
            color={theme.colors.gray_08}
          />
          <FlatList
            data={workouts}
            keyExtractor={item => item.id}
            renderItem={renderWorkoutCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            scrollEnabled={false}
            ListEmptyComponent={
              !isLoading && !error ? (
                <Label
                  text="Nenhum treino disponível"
                  typography={theme.typography.paragraph.b3}
                  color={theme.colors.gray_06}
                />
              ) : null
            }
          />
        </S.Container>
      </ScreenContainer>
      <ICIQReassessmentModal
        isOpen={isReassessmentModalOpen}
        onClose={handleCloseReassessmentModal}
        onSuccess={handleReassessmentSuccess}
      />
    </>
  );
};

export default ExerciseHome;
