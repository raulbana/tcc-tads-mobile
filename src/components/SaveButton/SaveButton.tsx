import {useDynamicTheme} from '../../hooks/useDynamicTheme';
import {moderateScale} from '../../utils/scales';
import Icon from '../Icon/Icon';
import * as S from './styles';

export interface SaveButtonProps {
  isSaved?: boolean;
  onPress: () => void;
  size?: number;
}

const SaveButton: React.FC<SaveButtonProps> = ({isSaved, onPress, size}) => {
  const theme = useDynamicTheme();

  return (
    <S.Button onPress={onPress}>
      <Icon
        name={'Bookmark'}
        size={size || moderateScale(24)}
        weight={isSaved ? 'fill' : 'regular'}
        color={theme.colors.purple_03}
      />
    </S.Button>
  );
};

export default SaveButton;
