import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../components/Label/Label';
import * as S from './styles';
import useAboutApp from './useAboutApp';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';

const AboutApp: React.FC = () => {
  const {onGoBack} = useAboutApp();
  const theme = useDynamicTheme();

  return (
    <ScreenContainer
      headerShown
      goBack={onGoBack}
      goBackTo="Minha Conta"
      scrollable>
      <S.Container>
        <S.Header>
          <Label
            typography={theme.typography.title.h3}
            color={theme.colors.gray_08}
            text="Sobre o Aplicativo"
          />
        </S.Header>
        <S.Content>
          <S.Section>
            <Label
              typography={theme.typography.title.b3}
              color={theme.colors.gray_08}
              text="DailyIU"
            />
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_07}
              text="O DailyIU é um aplicativo desenvolvido para auxiliar no acompanhamento e tratamento da incontinência urinária. Através de ferramentas como diário miccional, exercícios de fisioterapia pélvica e conteúdo educativo, buscamos proporcionar uma melhor qualidade de vida aos usuários."
              textAlign="justify"
            />
          </S.Section>
          <S.Section>
            <Label
              typography={theme.typography.title.b3}
              color={theme.colors.gray_08}
              text="Funcionalidades"
            />
            <S.FeatureList>
              <S.FeatureItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Diário Miccional: Registre e acompanhe seus episódios de incontinência"
                />
              </S.FeatureItem>
              <S.FeatureItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Exercícios de Fisioterapia Pélvica: Pratique exercícios guiados para fortalecimento do assoalho pélvico"
                />
              </S.FeatureItem>
              <S.FeatureItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Conteúdo Educativo: Acesse informações e dicas sobre incontinência urinária"
                />
              </S.FeatureItem>
              <S.FeatureItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Relatórios: Gere relatórios detalhados do seu acompanhamento"
                />
              </S.FeatureItem>
            </S.FeatureList>
          </S.Section>
          <S.Section>
            <Label
              typography={theme.typography.title.b3}
              color={theme.colors.gray_08}
              text="Versão"
            />
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_07}
              text="1.0.0"
            />
          </S.Section>
          <S.Section>
            <Label
              typography={theme.typography.title.b3}
              color={theme.colors.gray_08}
              text="Importante"
            />
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_07}
              text="Este aplicativo é uma ferramenta de apoio e não substitui o acompanhamento médico. Sempre consulte um profissional de saúde para diagnóstico e tratamento adequados."
              textAlign="justify"
            />
          </S.Section>
        </S.Content>
      </S.Container>
    </ScreenContainer>
  );
};

export default AboutApp;
