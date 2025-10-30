import React, {useEffect} from 'react';
import * as S from './styles';
import Calendar from './components/Calendar/Calendar';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import Label from '../../components/Label/Label';
import ReportCard from './components/ReportCard/ReportCard';
import {useDiary} from '../../contexts/DiaryContext';
import {useAuth} from '../../contexts/AuthContext';
import Loader from '../../components/Loader/Loader';
import Toast from '../../components/Toast/Toast';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

const Diary = () => {
  const {user, isLoggedIn} = useAuth();
  const {isLoading, error, clearError} = useDiary();
  const theme = useDynamicTheme();

  // A busca inicial dos dados do calendário agora é feita automaticamente pelo componente Calendar
  // quando o mês é carregado, então não precisamos mais desta lógica aqui

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
