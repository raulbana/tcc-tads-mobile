import Icon, {IconProps} from '../../../../../components/Icon/Icon';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import * as S from './styles';

export interface OptionItem {
  label: string;
  icon: IconProps;
  onPress?: () => void;
}

export interface OptionsListProps {
  options: OptionItem[];
}

const OptionsList: React.FC<OptionsListProps> = ({options}) => {
  return (
    <S.Container>
      <Label
        typography={theme.typography.paragraph.m2}
        color={theme.colors.gray_07}
        text="Opções"
      />
      <S.ListContainer>
        {options.map((option, index) => (
          <S.ListItem key={index} onPress={option.onPress}>
            <Icon {...option.icon} />
            <Label
              typography={theme.typography.paragraph.m3}
              color={theme.colors.gray_08}
              text={option.label}
            />
          </S.ListItem>
        ))}
      </S.ListContainer>
    </S.Container>
  );
};

export default OptionsList;
