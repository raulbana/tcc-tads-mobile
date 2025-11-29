import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import useOnboardingEnd from './useOnboardingEnd';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import ICIQWarningModal from '../components/ICIQWarningModal';
import * as S from './styles';

const OnboardingEnd: React.FC = () => {
  const {handleGoToRegister, handleContinueAnonymous, showICIQWarning, handleICIQWarningContinue} = useOnboardingEnd();
  const theme = useDynamicTheme();

  return (
    <ScreenContainer scrollable>
      <S.Wrapper>
        <S.Header>
          <Label
            typography={theme.typography.title.b2}
            color={theme.colors.gray_08}
            text="Escolha como continuar"
            textAlign="center"
          />
        </S.Header>
        <S.DescriptionContainer>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_06}
            text="Você pode criar uma conta para salvar seus dados na nuvem e acessá-los de qualquer dispositivo, ou continuar usando o app sem criar uma conta."
            textAlign="center"
          />
        </S.DescriptionContainer>
        <S.CardContainer>
          <S.Card>
            <S.CardHeader>
              <Label
                typography={theme.typography.title.b3}
                color={theme.colors.gray_08}
                text="Criar Conta"
                textAlign="center"
              />
            </S.CardHeader>
            <S.CardContent>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Seus dados salvos na nuvem"
                />
              </S.BenefitItem>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Acesso de múltiplos dispositivos"
                />
              </S.BenefitItem>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Acesso completo ao módulo de conteúdos"
                />
              </S.BenefitItem>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Sincronização automática"
                />
              </S.BenefitItem>
            </S.CardContent>
            <S.ButtonContainer>
              <Button
                type="PRIMARY"
                text="Criar Conta"
                onPress={handleGoToRegister}
              />
            </S.ButtonContainer>
          </S.Card>

          <S.Card>
            <S.CardHeader>
              <Label
                typography={theme.typography.title.b3}
                color={theme.colors.gray_08}
                text="Continuar Sem Cadastro"
                textAlign="center"
              />
            </S.CardHeader>
            <S.CardContent>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Uso imediato sem cadastro"
                />
              </S.BenefitItem>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Dados salvos apenas localmente"
                />
              </S.BenefitItem>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Acesso limitado a algumas funcionalidades"
                />
              </S.BenefitItem>
              <S.BenefitItem>
                <Label
                  typography={theme.typography.paragraph.r2}
                  color={theme.colors.gray_07}
                  text="• Sem acesso ao módulo de conteúdos (rede social)"
                />
              </S.BenefitItem>
            </S.CardContent>
            <S.ButtonContainer>
              <Button
                type="SECONDARY"
                text="Continuar Sem Login"
                onPress={handleContinueAnonymous}
              />
            </S.ButtonContainer>
          </S.Card>
        </S.CardContainer>
      </S.Wrapper>
      <ICIQWarningModal
        visible={showICIQWarning}
        onClose={handleICIQWarningContinue}
        onContinue={handleICIQWarningContinue}
      />
    </ScreenContainer>
  );
};

export default OnboardingEnd;

