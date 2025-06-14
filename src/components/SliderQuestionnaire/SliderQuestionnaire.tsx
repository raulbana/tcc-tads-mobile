import React from 'react';
import * as S from './styles';
import theme from '../../theme/theme';
import Label from '../Label/Label';

type SliderQuestionnaireProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  labels?: string[];
};

const SliderQuestionnaire: React.FC<SliderQuestionnaireProps> = ({
  min = 0,
  max = 10,
  step = 1,
  value,
  onValueChange,
  labels = ['Nada pertinente', 'teste', 'Muito pertinente'],
}) => {
  return (
    <S.Container>
      <S.LabelsRow>
        {labels.map((label, index) => (
          <Label
            key={index}
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
            text={label}
          />
        ))}
      </S.LabelsRow>
      <S.StyledSlider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={theme.colors.purple_04}
        maximumTrackTintColor={theme.colors.gray_08}
        thumbTintColor={theme.colors.purple_04}
        style={{height: 40}}
      />
      <S.LabelsRow>
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_07}
          text={`${min}`}
        />
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_07}
          text={`${max}`}
        />
      </S.LabelsRow>
      <Label
        typography={theme.typography.paragraph.r3}
        color={theme.colors.gray_07}
        text={`Valor selecionado: ${value}`}
      />
    </S.Container>
  );
};

export default SliderQuestionnaire;
