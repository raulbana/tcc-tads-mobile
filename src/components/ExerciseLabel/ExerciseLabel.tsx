import React from 'react';
import {ExerciseStatus} from '../../types/exercise';
import * as S from './styles';
import useExerciseLabel from './useExerciseLabel';
import Label from '../Label/Label';
import {useDynamicTheme} from '../../hooks/useDynamicTheme';

export interface ExerciseLabelProps {
  type: ExerciseStatus;
}

const ExerciseLabel: React.FC<ExerciseLabelProps> = ({type}) => {
  const {getLabel, getLabelColor, getBackgroundColor} = useExerciseLabel();
  const theme = useDynamicTheme();

  return (
    <S.Container type={type} backgroundColor={getBackgroundColor(type)}>
      <Label
        text={getLabel(type)}
        typography={theme.typography.paragraph.m0}
        color={getLabelColor(type)}
      />
    </S.Container>
  );
};

export default ExerciseLabel;
