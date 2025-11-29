import {PatientProfile, PatientProfileDTO} from '../types/auth';

/**
 * Calcula o score ICIQ baseado nos scores das questões
 * @param profile - Perfil do paciente
 * @returns Score ICIQ total
 */
export const calculateICIQScore = (profile: PatientProfile): number => {
  return profile.q1Score + profile.q2Score + profile.q3Score + profile.q4Score;
};

/**
 * Verifica se os exercícios devem ser bloqueados baseado no score ICIQ
 * @param profile - Perfil do paciente
 * @returns true se score > 12, false caso contrário
 */
export const shouldBlockExercises = (profile: PatientProfile): boolean => {
  return profile.iciqScore > 12;
};

/**
 * Transforma o PatientProfile local em PatientProfileDTO para a API
 * @param profile - Perfil do paciente no formato local
 * @param urinationLoss - String com as respostas da questão q6_when (quando ocorre a perda)
 * @returns PatientProfileDTO no formato esperado pela API
 */
export const transformProfileToDTO = (
  profile: PatientProfile,
  urinationLoss?: string,
): PatientProfileDTO => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const iciqScore = calculateICIQScore(profile);

  return {
    birthDate: formatDate(profile.birthDate),
    gender: profile.gender,
    iciq3answer: profile.q1Score,
    iciq4answer: profile.q2Score,
    iciq5answer: profile.q3Score,
    iciqScore,
    urinationLoss: urinationLoss || '',
  };
};
