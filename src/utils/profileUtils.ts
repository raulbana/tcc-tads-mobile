import {PatientProfile, PatientProfileDTO} from '../types/auth';

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

  const iciqScore = profile.q1Score + profile.q2Score + profile.q3Score + profile.q4Score;

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

