import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import * as S from './styles';
import {CheckCircle} from 'phosphor-react-native';
import {moderateScale} from '../../../../../utils/scales';

interface StepLabelProps {
  step: number;
  totalSteps: number;
}

const StepLabel: React.FC<StepLabelProps> = ({step, totalSteps}) => {
  return (
    <S.Container>
      <CheckCircle size={moderateScale(24)} color={theme.colors.purple_03} />
      <Label
        typography={theme.typography.paragraph.sm3}
        color={theme.colors.gray_08}
        text="Etapa ">
        <Label
          typography={theme.typography.paragraph.b4}
          color={theme.colors.gray_08}
          text={step.toString()}>
          <Label
            typography={theme.typography.paragraph.sm3}
            color={theme.colors.gray_08}
            text={` / ${totalSteps}`}
          />
        </Label>
      </Label>
    </S.Container>
  );
};

export default StepLabel;
