import React from 'react';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import CreateAccountCard from './components/CreateAccountCard/CreateAccountCard';
import ProfileCard from './components/ProfileCard/ProfileCard';
import * as S from './styles';
import Label from '../../../components/Label/Label';
import OptionsList from './components/OptionsList/OptionsList';
import useMyAccount from './useMyAccount';
import ContactUsCard from './components/ContactUsCard/ContactUsCard';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';
import NotificationPermissionModal from '../../../components/NotificationPermissionModal/NotificationPermissionModal';

const MyAccount = () => {
  const {
    options,
    advantages,
    navigateToTalkToUs,
    navigateToRegister,
    navigateToEditProfile,
    user,
    isLoggedIn,
    notificationModalVisible,
    hideNotificationModal,
  } = useMyAccount();

  const theme = useDynamicTheme();

  return (
    <ScreenContainer scrollable>
      <S.Wrapper>
        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          text="Minha Conta"
        />
        {isLoggedIn && user ? (
          <ProfileCard user={user} onEditProfile={navigateToEditProfile} />
        ) : (
          <CreateAccountCard
            advantages={advantages}
            onCreateAccount={navigateToRegister}
          />
        )}
        <OptionsList options={options} />
        <ContactUsCard onPress={navigateToTalkToUs} />
      </S.Wrapper>
      <NotificationPermissionModal
        visible={notificationModalVisible}
        onClose={hideNotificationModal}
      />
    </ScreenContainer>
  );
};

export default MyAccount;
