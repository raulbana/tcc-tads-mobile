import {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from '../../../contexts/AuthContext';
import {NavigationStackProp} from '../../../navigation/routes';
import {User} from '../../../types/auth';
import {EditProfileRequest} from '../../../types/config';
import useConfigQueries from '../services/configQueryFactory';
import {profileFormSchema, ProfileFormData} from './schema/profileFormSchema';
import useDialogModal from '../../../hooks/useDialogModal';

const useEditProfile = () => {
  const {user, updateUser} = useAuth();
  const navigation = useNavigation<NavigationStackProp>();
  const {DialogPortal, showDialog} = useDialogModal();

  const configQueries = useConfigQueries(['config']);
  const editProfileMutation = configQueries.editProfile();

  const [isLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    watch,
    reset,
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: undefined,
      profilePictureUrl: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (user) {
      const validGenders: Array<'male' | 'female' | 'other'> = [
        'male',
        'female',
        'other',
      ];
      const userGender = user.profile?.gender;
      const gender =
        userGender && validGenders.includes(userGender)
          ? userGender
          : undefined;

      reset({
        name: user.name,
        email: user.email,
        gender: gender,
        profilePictureUrl: user.profilePictureUrl || '',
      });
    }
  }, [user, reset]);

  const handleProfilePictureChange = useCallback(
    (imageUri: string) => {
      setValue('profilePictureUrl', imageUri, {shouldValidate: true});
    },
    [setValue],
  );

  const handleRemoveProfilePicture = useCallback(() => {
    setValue('profilePictureUrl', '', {shouldValidate: true});
  }, [setValue]);

  const handleSaveProfile = async (data: ProfileFormData) => {
    if (!user) {
      return;
    }

    try {
      const originalPictureUrl = user.profilePictureUrl || '';
      const newPictureUrl = data.profilePictureUrl || '';
      const isPictureChanged = newPictureUrl !== originalPictureUrl;

      const profilePictureUri =
        isPictureChanged && newPictureUrl && !newPictureUrl.startsWith('http')
          ? newPictureUrl
          : undefined;

      const editProfileData: EditProfileRequest = {
        name: data.name.trim(),
        email: data.email.trim(),
      };

      const response = await editProfileMutation.mutateAsync({
        userId: user.id,
        data: editProfileData,
        profilePictureUri,
      });

      const updatedUser: User = {
        ...user,
        name: response.name,
        email: response.email,
        profilePictureUrl: response.profilePictureUrl,
        profile: {
          ...response.profile,
          gender: response.profile.gender as User['profile']['gender'],
          iciqScore: response.profile.iciqScore as User['profile']['iciqScore'],
        },
        preferences: {
          ...response.preferences,
          workoutMediaType: response.preferences
            .workoutMediaType as User['preferences']['workoutMediaType'],
        },
      };

      await updateUser(updatedUser);

      showDialog({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso!',
        primaryButton: {
          label: 'OK',
          onPress: () => goBack(),
        },
        dismissOnBackdropPress: false,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      showDialog({
        title: 'Erro',
        description:
          error instanceof Error
            ? error.message
            : 'Falha ao atualizar perfil. Tente novamente.',
        primaryButton: {
          label: 'OK',
          onPress: () => {},
        },
      });
    }
  };

  const handleCancel = () => {
    showDialog({
      title: 'Cancelar Edição',
      description:
        'Tem certeza que deseja cancelar? As alterações serão perdidas.',
      secondaryButton: {
        label: 'Continuar Editando',
        onPress: () => {},
      },
      primaryButton: {
        label: 'Cancelar',
        onPress: () => goBack(),
      },
    });
  };

  const goBack = useCallback(() => {
    navigation.navigate('MainTabs', {screen: 'MyAccount'});
  }, [navigation]);

  return {
    user,
    isLoading,
    isSaving: editProfileMutation.isPending,
    errors,
    isValid,
    register,
    control,
    handleSaveProfile: handleSubmit(handleSaveProfile),
    handleCancel,
    handleProfilePictureChange,
    handleRemoveProfilePicture,
    goBack,
    DialogPortal,
  };
};

export default useEditProfile;
