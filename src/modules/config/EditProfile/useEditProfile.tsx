import {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from '../../../contexts/AuthContext';
import {NavigationStackProp} from '../../../navigation/routes';
import {User, updateUserRequest} from '../../../types/auth';
import authServices from '../../auth/services/authServices';
import {profileFormSchema, ProfileFormData} from './schema/profileFormSchema';
import useDialogModal from '../../../hooks/useDialogModal';

const useEditProfile = () => {
  const {user, updateUser} = useAuth();
  const navigation = useNavigation<NavigationStackProp>();
  const {DialogPortal, showDialog} = useDialogModal();

  const [isLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      reset({
        name: user.name,
        email: user.email,
        gender: user.profile.gender,
        profilePictureUrl: user.profilePictureUrl || '',
      });
    }
  }, [user]);

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

    setIsSaving(true);

    try {
      const updateData: updateUserRequest = {
        id: user.id,
        name: data.name.trim(),
        email: data.email.trim(),
        profilePictureUrl: data.profilePictureUrl,
        profile: {
          ...user.profile,
          gender: data.gender,
        },
        preferences: user.preferences,
      };

      const response = await authServices.updateUser(updateData);

      if (response.status === 'success') {
        const updatedUser: User = {
          ...user,
          name: data.name.trim(),
          email: data.email.trim(),
          profilePictureUrl: data.profilePictureUrl,
          profile: {
            ...user.profile,
            gender: data.gender,
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
      } else {
        showDialog({
          title: 'Erro',
          description: 'Falha ao atualizar perfil',
          primaryButton: {
            label: 'OK',
            onPress: () => {},
          },
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showDialog({
        title: 'Erro',
        description: 'Falha ao atualizar perfil. Tente novamente.',
        primaryButton: {
          label: 'OK',
          onPress: () => {},
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    showDialog({
      title: 'Cancelar Edição',
      description: 'Tem certeza que deseja cancelar? As alterações serão perdidas.',
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
    isSaving,
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
