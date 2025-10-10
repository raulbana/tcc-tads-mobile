import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import Icon from '../Icon/Icon';
import theme from '../../theme/theme';
import {ExerciseBenefit} from '../../types/exercise';

export interface BenefitsCardProps {
  benefits: ExerciseBenefit[];
}

const BenefitsCard: React.FC<BenefitsCardProps> = ({benefits}) => {
  return (
    <S.Container>
      <S.TitleContainer>
        <Label
          text="Benefícios"
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
        />
      </S.TitleContainer>
      <S.BenefitsList>
        {benefits.map(benefit => (
          <S.BenefitItem key={benefit.id}>
            <S.CheckIconContainer>
              <Icon
                name="CheckCircle"
                size={16}
                color={theme.colors.checked_green}
                weight="fill"
              />
            </S.CheckIconContainer>
            <S.BenefitContent>
              <Label
                text={benefit.title}
                typography={theme.typography.paragraph.r3}
                color={theme.colors.gray_08}
              />
              <Label
                text={benefit.description}
                typography={theme.typography.paragraph.r3}
                color={theme.colors.gray_08}
              />
            </S.BenefitContent>
          </S.BenefitItem>
        ))}
      </S.BenefitsList>
    </S.Container>
  );
};

export default BenefitsCard;
