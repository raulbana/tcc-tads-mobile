import React from 'react';
import * as S from './styles';
import Calendar from './components/Calendar/Calendar';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import Label from '../../components/Label/Label';
import theme from '../../theme/theme';
import ReportCard from './components/ReportCard/ReportCard';

const Diary = () => {
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
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default Diary;
