import Icon from '../../../../../components/Icon/Icon';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import {moderateScale} from '../../../../../utils/scales';
import * as S from './styles';

export interface RepostButtonProps {
  onPress: () => void;
  isReposted?: boolean;
}

const RepostButton: React.FC<RepostButtonProps> = ({onPress, isReposted}) => {
  return (
    <S.Button onPress={onPress} isReposted={isReposted}>
      <Label
        typography={theme.typography.paragraph.m2}
        color={isReposted ? theme.colors.white : theme.colors.purple_04}
        text={isReposted ? 'Desfazer' : 'Repostar'}
      />
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
          color={theme.colors.white}
        />
      )}
    </S.Button>
  );
};

export default RepostButton;
