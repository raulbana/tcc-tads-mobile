import Badge from '../../../../../components/Badge/Badge';
import LikeButton from '../../../../../components/LikeButton/LikeButton';
import theme from '../../../../../theme/theme';
import RepostButton from '../RepostButton/RepostButton';
import * as S from './styles';

export interface ActionsRowProps {
  isLiked?: boolean;
  onLikePress: () => void;
  isReposted?: boolean;
  onRepostPress: () => void;
  category: string;
}

const ActionsRow: React.FC<ActionsRowProps> = ({
  isLiked,
  onLikePress,
  isReposted,
  onRepostPress,
  category,
}) => {
  return (
    <S.ActionsRowContainer>
      <Badge
        content={category}
        backgroundColor={theme.colors.purple_02}
        textColor={theme.colors.purple_04}
      />
      <S.RightActions>
        <S.RepostButtonContainer>
          <RepostButton onPress={onRepostPress} isReposted={isReposted} />
        </S.RepostButtonContainer>
        <LikeButton onPress={onLikePress} size={28} isLiked={isLiked} />
      </S.RightActions>
    </S.ActionsRowContainer>
  );
};

export default ActionsRow;
