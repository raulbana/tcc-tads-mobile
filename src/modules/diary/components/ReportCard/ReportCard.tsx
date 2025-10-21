import React from 'react';
import * as S from './styles';
import {FileArchive} from 'phosphor-react-native';
import Label from '../../../../components/Label/Label';
import Button from '../../../../components/Button/Button';
import { useDynamicTheme } from '../../../../hooks/useDynamicTheme';

export interface ReportCardProps {
  onGenerateReport: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({onGenerateReport}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Container>
      <S.HeaderRow>
        <FileArchive size={20} color={theme.colors.purple_03} />
        <Label
          typography={theme.typography.paragraph.sb2}
          color={theme.colors.gray_08}
          text={`Relatório Mensal`}
        />
      </S.HeaderRow>
      <Label
        typography={theme.typography.paragraph.r2}
        color={theme.colors.gray_08}
        text={`Gere um Relatório Mensal para acompanhar o seu progresso e/ou poder apresentar a um profissional para avaliação e tratamento.`}
      />
      <Button
        text={
          <Label
            typography={theme.typography.paragraph.sb2}
            text={`Gerar Relatório`}
            color={theme.colors.white}
          />
        }
        onPress={onGenerateReport}
      />
    </S.Container>
  );
};

export default ReportCard;
