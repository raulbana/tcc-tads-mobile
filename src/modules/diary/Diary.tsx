import React, {useCallback, useState} from 'react';
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
  const [reportToast, setReportToast] = useState<{
    message: string;
    type: 'SUCCESS' | 'ERROR';
    isOpen: boolean;
  }>({message: '', type: 'SUCCESS', isOpen: false});

  const handleGenerateReport = useCallback(async () => {
    try {
      if (!user?.id) {
        setReportToast({
          message: 'Você precisa estar logado para gerar um relatório.',
          type: 'ERROR',
          isOpen: true,
        });
        return;
      }

      const from = moment().startOf('month').format('YYYY-MM-DD');
      const to = moment().endOf('month').format('YYYY-MM-DD');

      const report = await generateReportMutation.mutateAsync({from, to});
      
      if (report && report.history && report.history.length > 0) {
        await printReportPdf(report);
        setReportToast({
          message: 'Relatório gerado com sucesso!',
          type: 'SUCCESS',
          isOpen: true,
        });
      } else {
        setReportToast({
          message: 'Não há dados suficientes para gerar o relatório.',
          type: 'ERROR',
          isOpen: true,
        });
      }
    } catch (e) {
      console.error('Erro ao gerar relatório:', e);
      const errorMessage =
        e instanceof Error
          ? e.message
          : 'Erro ao gerar relatório. Tente novamente.';
      setReportToast({
        message: errorMessage,
        type: 'ERROR',
        isOpen: true,
      });
    }
  }, [generateReportMutation, user]);

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
        {reportToast.isOpen && (
          <Toast
            message={reportToast.message}
            type={reportToast.type}
            onClose={() => setReportToast({...reportToast, isOpen: false})}
            isOpen={reportToast.isOpen}
          />
        )}
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default Diary;
