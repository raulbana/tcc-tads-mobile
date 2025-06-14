import React from 'react';
import Label from '../../../components/Label/Label';
import theme from '../../../theme/theme';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import SliderQuestionnaire from '../../../components/SliderQuestionnaire/SliderQuestionnaire';

const OnboardingQuestion = () => {
  return (
    <ScreenContainer>
      <Label
        text="Onboarding Question"
        typography={theme.typography.title.b1}
        color={theme.colors.gray_08}
      />
      <SliderQuestionnaire
        value={4}
        step={1}
        min={0}
        max={4}
        onValueChange={(value: number) => console.log(value)}
      />
    </ScreenContainer>
  );
};

export default OnboardingQuestion;
