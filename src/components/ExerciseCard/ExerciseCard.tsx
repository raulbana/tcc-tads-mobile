import {useDynamicTheme} from '../../hooks/useDynamicTheme';
import {Exercise} from '../../types/exercise';
import Button from '../Button/Button';
import ExerciseLabel from '../ExerciseLabel/ExerciseLabel';
import Label from '../Label/Label';
import * as S from './styles';
import {Alarm, CheckCircle, SquaresFour} from 'phosphor-react-native';

export interface ExerciseCardProps {
  typeCard: 'default' | 'detailed';
  exercise: Exercise;
  onPressPrimaryAction?: () => void;
  onPressSecondaryAction?: () => void;
  showBadge?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPressPrimaryAction,
  onPressSecondaryAction,
  showBadge = false,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.HeaderRow>
        <S.TitleContainer>
          <Label
            typography={theme.typography.paragraph.sb5}
            text={exercise.title}
            color={theme.colors.gray_08}
            numberOfLines={2}
          />
        </S.TitleContainer>
        {showBadge && (
          <S.LabelContainer>
            <ExerciseLabel type={exercise.status} />
          </S.LabelContainer>
        )}
      </S.HeaderRow>
      <S.DataRow>
        <S.DataRowItem>
          <Alarm size={16} color={theme.colors.gray_06} />
          <Label
            typography={theme.typography.paragraph.r2}
            text={exercise.duration}
            color={theme.colors.gray_08}
          />
        </S.DataRowItem>
        <S.DataRowItem>
          <SquaresFour size={16} color={theme.colors.gray_06} />
          <Label
            typography={theme.typography.paragraph.r2}
            text={exercise.category}
            color={theme.colors.gray_08}
          />
        </S.DataRowItem>
        <S.DataRowItem>
          <CheckCircle size={16} color={theme.colors.gray_06} weight="fill" />
          <Label
            typography={theme.typography.paragraph.r2}
            text={`${exercise.sets} sets, ${exercise.repetitions} reps`}
            color={theme.colors.gray_08}
          />
        </S.DataRowItem>
      </S.DataRow>
      <Label
        typography={theme.typography.paragraph.r2}
        text={exercise.description}
        color={theme.colors.gray_06}
      />
      <S.ButtonRow>
        {onPressPrimaryAction && (
          <S.ButtonContainer>
            <Button
              onPress={onPressPrimaryAction}
              text={
                <Label
                  typography={theme.typography.paragraph.sb2}
                  text="Começar"
                  color={theme.colors.white}
                />
              }
              type="PRIMARY"
            />
          </S.ButtonContainer>
        )}
        {onPressSecondaryAction && (
          <S.ButtonContainer>
            <Button
              onPress={onPressSecondaryAction}
              text={
                <Label
                  typography={theme.typography.paragraph.sb2}
                  text="Personalizar"
                  color={theme.colors.purple_04}
                />
              }
              type="SECONDARY"
            />
          </S.ButtonContainer>
        )}
      </S.ButtonRow>
    </S.Container>
  );
};

export default ExerciseCard;
