import React, {useCallback} from 'react';
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
import moment from 'moment';
import {diaryQueryFactory} from './services/diaryQueryFactory';
import {printReportPdf} from './utils/reportPdf';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainTabParamList} from '../../navigation/routes';

const Diary = () => {
  const route = useRoute<RouteProp<MainTabParamList, 'Diary'>>();
  const selectedDate = route.params?.selectedDate;
  const {user} = useAuth();
  const {isLoading, error, clearError} = useDiary();
  const theme = useDynamicTheme();
  const queries = diaryQueryFactory(['diary']);
  const generateReportMutation = queries.useGenerateReport(
    user?.id ? String(user.id) : undefined,
  );

  const handleGenerateReport = useCallback(async () => {
    try {
      const from = moment().startOf('month').format('YYYY-MM-DD');
      const to = moment().endOf('month').format('YYYY-MM-DD');

      const report = await generateReportMutation.mutateAsync({from, to});
      await printReportPdf(report);
    } catch (e) {
      console.error('Erro ao gerar relatório:', e);
    }
  }, [generateReportMutation]);

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
        <Calendar initialSelectedDate={selectedDate} />
        <ReportCard onGenerateReport={handleGenerateReport} />

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
