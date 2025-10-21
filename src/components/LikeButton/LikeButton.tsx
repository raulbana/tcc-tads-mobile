import { useDynamicTheme } from '../../hooks/useDynamicTheme';
import {moderateScale} from '../../utils/scales';
import Icon from '../Icon/Icon';
import * as S from './styles';

export interface LikeButtonProps {
  isLiked?: boolean;
  onPress: () => void;
  size?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({isLiked, onPress, size}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Button onPress={onPress}>
      <Icon
        name={'Heart'}
        size={size || moderateScale(24)}
        weight={isLiked ? 'fill' : 'regular'}
        color={theme.colors.purple_03}
      />
    </S.Button>
  );
};

export default LikeButton;
