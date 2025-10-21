import Icon from '../../../../../components/Icon/Icon';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';
import {moderateScale} from '../../../../../utils/scales';
import * as S from './styles';

export interface RepostButtonProps {
  onPress: () => void;
  isReposted?: boolean;
}

const RepostButton: React.FC<RepostButtonProps> = ({onPress, isReposted}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Button onPress={onPress} isReposted={isReposted}>
      {!isReposted ? (
        <Icon
          name={'ArrowBendDoubleUpRight'}
          size={moderateScale(24)}
          weight={'regular'}
          color={theme.colors.purple_04}
        />
      ) : (
        <Icon
          name={'X'}
          size={moderateScale(24)}
          weight={'bold'}
          color={theme.colors.purple_04}
        />
      )}
    </S.Button>
  );
};

export default RepostButton;
