import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import {User} from '../../../../../types/auth';
import AnonymousUserProfileImage from '../../../../../assets/illustrations/anonymous_user.svg';

export interface ProfileCardProps {
  user: User;
  onEditProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({user, onEditProfile}) => {
  const hasProfilePicture =
    user.profilePictureUrl && user.profilePictureUrl.trim() !== '';

  return (
    <S.Container>
      <S.Section style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <S.AvatarCircle>
          {hasProfilePicture ? (
            <Image
              source={{uri: user.profilePictureUrl}}
              style={S.profileImageStyle}
            />
          ) : (
            <AnonymousUserProfileImage width={40} height={40} />
          )}
        </S.AvatarCircle>
        <View style={{flex: 1}}>
          <Label
            typography={theme.typography.paragraph.m3}
            color={theme.colors.gray_08}
            text={user.name}
          />
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_06}
            text={user.email}
          />
        </View>
      </S.Section>
      <S.Divider />
      <S.Section>
        <TouchableOpacity onPress={onEditProfile} style={S.editButtonStyle}>
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.purple_04}
            text="Editar Perfil"
          />
        </TouchableOpacity>
      </S.Section>
    </S.Container>
  );
};

export default ProfileCard;
