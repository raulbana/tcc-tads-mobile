import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import useAccessibilitySettings from './useAccessibilitySettings';
import SettingsList from './components/SettingsList/SettingsList';
import * as S from './styles';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

const AccessibilitySettings = () => {
  const {navigateToMyAccount, settingsList, handleSave, isLoading} =
    useAccessibilitySettings();

  const theme = useDynamicTheme();

  return (
    <ScreenContainer
      headerShown
      goBack={navigateToMyAccount}
      goBackTo="Minha Conta">
      <S.Wrapper>
        <Label
          typography={theme.typography.title.h4}
          color={theme.colors.gray_08}
          text="Configurações de Acessibilidade"
        />
        <SettingsList items={settingsList} />
        <S.ButtonContainer>
          <Button
            text={isLoading ? 'Salvando...' : 'Salvar'}
            onPress={handleSave}
            disabled={isLoading}
          />
        </S.ButtonContainer>
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default AccessibilitySettings;
