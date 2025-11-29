import React from 'react';
import * as S from './styles';
import {Warning} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';

const ExerciseBlockedCard: React.FC = () => {
  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.InfoContainer>
        <S.TextRow>
          <Warning weight="fill" size={24} color={theme.colors.error} />
          <Label
            typography={theme.typography.paragraph.m3}
            color={theme.colors.gray_08}
            text="Módulo de Exercícios Bloqueado"
          />
        </S.TextRow>
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text="Com base nas suas respostas ao questionário, identificamos que você possui uma condição grave ou muito grave de incontinência urinária."
        />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text="Por conta da sua condição, recomendamos fortemente que você consulte um médico antes de realizar exercícios de fisioterapia pélvica. O acompanhamento profissional é essencial para garantir sua segurança e o melhor tratamento."
        />
      </S.InfoContainer>
    </S.Container>
  );
};

export default ExerciseBlockedCard;

