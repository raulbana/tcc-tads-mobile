import React, {useEffect} from 'react';
import * as S from './styles';
import Calendar from './components/Calendar/Calendar';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import Label from '../../components/Label/Label';
import theme from '../../theme/theme';
import ReportCard from './components/ReportCard/ReportCard';
import {useDiary} from '../../contexts/DiaryContext';
import {useAuth} from '../../contexts/AuthContext';
import Loader from '../../components/Loader/Loader';
import Toast from '../../components/Toast/Toast';

const Diary = () => {
  const {user, isLoggedIn} = useAuth();
  const {isLoading, error, clearError, loadCalendarEvents} = useDiary();

  useEffect(() => {
    if (isLoggedIn && user) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      loadCalendarEvents(
        startOfMonth.toISOString().split('T')[0],
        endOfMonth.toISOString().split('T')[0],
      ).catch(err => {
        console.error('Erro ao carregar eventos do calendário:', err);
      });
    }
  }, [isLoggedIn, user, loadCalendarEvents]);

  if (isLoading) {
    return <Loader overlay />;
  }

  return (
    <ScreenContainer scrollable>
      <S.Wrapper>
        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          text={'Diário Miccional'}
        />
        <Calendar />
        <ReportCard onGenerateReport={() => {}} />

        {error && (
          <Toast
            message={error}
            type={'ERROR'}
            onClose={clearError}
            isOpen={!!error}
          />
        )}
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default Diary;
