import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import CreateAccountCard from './components/CreateAccountCard/CreateAccountCard';
import * as S from './styles';
import Label from '../../../components/Label/Label';
import theme from '../../../theme/theme';
import OptionsList from './components/OptionsList/OptionsList';
import useMyAccount from './useMyAccount';
import ContactUsCard from './components/ContactUsCard/ContactUsCard';

const MyAccount = () => {
  const {options, advantages, navigateToTalkToUs} = useMyAccount();

  return (
    <ScreenContainer scrollable>
      <S.Wrapper>
        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          text="Minha Conta"
        />
        <CreateAccountCard advantages={advantages} onCreateAccount={() => {}} />
        <OptionsList options={options} />
        <ContactUsCard onPress={navigateToTalkToUs} />
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default MyAccount;
