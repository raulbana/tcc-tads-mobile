import React from 'react';
import {Image} from 'react-native';
import {Pencil} from 'phosphor-react-native';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import {User as UserType} from '../../../../../types/auth';
import AnonymousUserProfileImage from '../../../../../assets/illustrations/anonymous_user.svg';
import * as S from './styles';

export interface ProfileHeaderProps {
  user: UserType;
  onEditProfile: () => void;
  stats?: {
    likes: number;
    posts: number;
    saved: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditProfile,
  stats,
}) => {
  const theme = useDynamicTheme();
  const hasProfilePicture =
    user.profilePictureUrl && user.profilePictureUrl.trim() !== '';

  return (
    <S.Container>
      <S.ProfileSection>
        <S.AvatarContainer>
          {hasProfilePicture ? (
            <Image
              source={{uri: user.profilePictureUrl}}
              style={S.profileImageStyle}
            />
          ) : (
            <AnonymousUserProfileImage width={80} height={80} />
          )}
        </S.AvatarContainer>

        <S.InfoContainer>
          <S.NameContainer>
            <Label
              typography={theme.typography.title.b2}
              color={theme.colors.gray_08}
              text={user.name}
            />
          </S.NameContainer>
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_06}
            text={user.email}
          />
        </S.InfoContainer>
      </S.ProfileSection>
      <S.StatsContainer>
        <S.StatItem>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text={String(stats?.likes ?? 0)}
          />
          <Label
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
            text="Curtidas"
          />
        </S.StatItem>

        <S.StatItem>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text={String(stats?.saved ?? 0)}
          />
          <Label
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
            text="Vídeos Salvos"
          />
        </S.StatItem>

        <S.StatItem>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text={String(stats?.posts ?? 0)}
          />
          <Label
            typography={theme.typography.paragraph.sm2}
            color={theme.colors.gray_06}
            text="Postagens"
          />
        </S.StatItem>
      </S.StatsContainer>

      <S.ActionContainer>
        <Button
          type="PRIMARY"
          size="MEDIUM"
          text={
            <Label
              typography={theme.typography.paragraph.sb2}
              text="Editar Perfil"
              color={theme.colors.white}
            />
          }
          onPress={onEditProfile}
          icon={<Pencil size={16} color={theme.colors.white} weight="bold" />}
          iconPosition="LEFT"
        />
      </S.ActionContainer>
    </S.Container>
  );
};

export default ProfileHeader;
