import React from 'react';
import * as S from './styles';
import {CheckCircle} from 'phosphor-react-native';
import Button from '../../../../../components/Button/Button';
import Label from '../../../../../components/Label/Label';
import typography from '../../../../../theme/typography';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

interface RecommendationCardProps {
  onButtonClick: () => void;
  title: string;
  description: string;
  buttonLabel: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  onButtonClick,
  title,
  description,
  buttonLabel,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.InfoContainer>
        <S.TextRow>
          <CheckCircle weight="fill" size={24} color={theme.colors.purple_04} />
          <Label
            typography={theme.typography.paragraph.m3}
            color={theme.colors.gray_08}
            text={title}
          />
        </S.TextRow>
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text={description}
        />
        <Button
          onPress={onButtonClick}
          text={
            <Label
              typography={typography.paragraph.sb2}
              color={theme.colors.white}
              text={buttonLabel}
            />
          }
        />
      </S.InfoContainer>
      <S.IllustrationContainer>
        <S.Illustration />
      </S.IllustrationContainer>
    </S.Container>
  );
};

export default RecommendationCard;
