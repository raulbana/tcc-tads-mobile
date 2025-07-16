import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import theme from '../../theme/theme';

type RadioScaleProps = {
  label: string;
  description?: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
};

const RadioScale: React.FC<RadioScaleProps> = ({
  label,
  description,
  min = 0,
  max = 10,
  value,
  onChange,
}) => {
  return (
    <S.Container>
      <Label
        typography={theme.typography.paragraph.b5}
        color={theme.colors.gray_08}
        text={label}
        textAlign="center"
      />
      {description && (
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_07}
          text={description}
          textAlign="center"
        />
      )}
      <S.ScaleRow>
        {Array.from({length: max - min + 1}).map((_, idx) => {
          const scaleValue = min + idx;
          const selected = value === scaleValue;
          return (
            <S.ScaleItem key={scaleValue} onPress={() => onChange(scaleValue)}>
              <Label
                typography={theme.typography.paragraph.r3}
                color={theme.colors.gray_08}
                text={String(scaleValue)}
                textAlign="center"
              />
              <S.Circle selected={selected}>
                {selected && <S.FilledCircle />}
              </S.Circle>
            </S.ScaleItem>
          );
        })}
      </S.ScaleRow>
    </S.Container>
  );
};

export default RadioScale;
