import React from 'react';
import {View} from 'react-native';
import * as S from './styles';
import Label from '../Label/Label';
import {Slider} from '@miblanchard/react-native-slider';
import {moderateScale, verticalScale} from '../../utils/scales';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  labels?: string[];
  trackHeight?: number;
  thumbSize?: number;
};

const SliderInput: React.FC<SliderProps> = ({
  min = 0,
  max = 10,
  step = 1,
  value,
  onValueChange,
  labels = ['Nada pertinente', 'Muito pertinente'],
  trackHeight = verticalScale(8),
  thumbSize = moderateScale(16),
}) => {

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.LabelsRow>
        {labels.map(label => (
          <Label
            key={label}
            typography={theme.typography.paragraph.r3}
            color={theme.colors.gray_07}
            text={label}
          />
        ))}
      </S.LabelsRow>
      <View style={{width: '100%', alignItems: 'center', height: 48}}>
        <Slider
          value={value}
          minimumValue={min}
          maximumValue={max}
          step={step}
          onValueChange={([val]) => onValueChange(val)}
          containerStyle={{
            width: '100%',
            height: 48,
            justifyContent: 'center',
          }}
          trackStyle={{
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: theme.colors.gray_02,
          }}
          minimumTrackTintColor={theme.colors.purple_02}
          maximumTrackTintColor={theme.colors.gray_02}
          thumbStyle={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: theme.colors.purple_03,
            borderWidth: 2,
            borderColor: theme.colors.purple_03,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: {width: 0, height: 2},
          }}
        />
      </View>
      <S.LabelsRow>
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_07}
          text={`${min}`}
        />
        <Label
          typography={theme.typography.paragraph.b5}
          color={theme.colors.gray_07}
          text={`Selecionado: ${value}`}
        />
        <Label
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_07}
          text={`${max}`}
        />
      </S.LabelsRow>
    </S.Container>
  );
};

export default SliderInput;
