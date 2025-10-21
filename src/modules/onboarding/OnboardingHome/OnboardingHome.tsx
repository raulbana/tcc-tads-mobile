import * as S from './styles';

import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import useOnboardingHome from './useOnboardingHome';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

const OnboardingHome = () => {
  const {navigateToQuestionnaire} = useOnboardingHome();

  const theme = useDynamicTheme();

  return (
    <ScreenContainer>
      <S.Wrapper>
        <Label
          typography={theme.typography.title.h3}
          text={'Seja bem-vindo(a) ao DailyIU! Seu app para acompanhamento de '}
          color={theme.colors.gray_08}
          numberOfLines={4}
          textBreakStrategy="balanced">
          <Label
            typography={theme.typography.title.b3}
            text={'Incontinência Urinária!\n'}
            color={theme.colors.gray_08}
          />
        </Label>
        <Label
          typography={theme.typography.title.h3}
          text={'Vamos começar?'}
          color={theme.colors.gray_08}
          textAlign="center"
        />
        <S.Container>
          <S.Illustration />
          <S.ButtonContainer>
              <Button text={'Continuar'} onPress={navigateToQuestionnaire} />
          </S.ButtonContainer>
        </S.Container>
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default OnboardingHome;
