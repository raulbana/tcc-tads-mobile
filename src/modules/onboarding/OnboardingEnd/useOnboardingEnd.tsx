import {useNavigation} from '@react-navigation/native';
import {NavigationStackProp} from '../../../navigation/routes';
import {useAuth} from '../../../contexts/AuthContext';
import {useEffect, useRef, useState} from 'react';
import {
  MMKVStorage,
  EXERCISES_BLOCKED_KEY,
  ONBOARDING_DATA_KEY,
} from '../../../storage/mmkvStorage';
import {shouldBlockExercises} from '../../../utils/profileUtils';
import {PatientProfile} from '../../../types/auth';

const useOnboardingEnd = () => {
  const {navigate} = useNavigation<NavigationStackProp>();
  const {
    setAnonymousMode,
    isPendingRegister,
    setPendingRegister,
    getPatientProfile,
  } = useAuth();
  const hasNavigated = useRef(false);
  const [showICIQWarning, setShowICIQWarning] = useState(false);

  useEffect(() => {
    // Verificar se deve mostrar o aviso ICIQ
    // Primeiro tenta pegar do contexto, depois do storage
    let profile = getPatientProfile();

    if (!profile) {
      // Tentar pegar do storage
      try {
        const onboardingDataStr = MMKVStorage.getString(ONBOARDING_DATA_KEY);
        if (onboardingDataStr) {
          profile = JSON.parse(onboardingDataStr) as PatientProfile;
        }
      } catch (error) {}
    }

    if (profile && shouldBlockExercises(profile)) {
      setShowICIQWarning(true);
      // Salvar flag de bloqueio
      MMKVStorage.set(EXERCISES_BLOCKED_KEY, 'true');
    } else {
      // Garantir que a flag não está setada se o score não requer bloqueio
      MMKVStorage.delete(EXERCISES_BLOCKED_KEY);
    }
  }, [getPatientProfile]);

  useEffect(() => {
    if (!hasNavigated.current && isPendingRegister()) {
      hasNavigated.current = true;
      navigate('Auth', {screen: 'Register'});
      setTimeout(() => {
        setPendingRegister(false);
      }, 0);
    }
  }, [isPendingRegister, setPendingRegister, navigate]);

  const handleICIQWarningContinue = () => {
    setShowICIQWarning(false);
  };

  const handleGoToRegister = async () => {
    await setAnonymousMode(false);
    navigate('Auth', {screen: 'Register'});
    setPendingRegister(false);
  };

  const handleContinueAnonymous = async () => {
    await setAnonymousMode(true);
    navigate('MainTabs');
    setPendingRegister(false);
  };

  return {
    handleGoToRegister,
    handleContinueAnonymous,
    showICIQWarning,
    handleICIQWarningContinue,
  };
};

export default useOnboardingEnd;
