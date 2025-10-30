import Badge from '../../../../../components/Badge/Badge';
import LikeButton from '../../../../../components/LikeButton/LikeButton';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import RepostButton from '../RepostButton/RepostButton';
import * as S from './styles';

export interface ActionsRowProps {
  isLiked?: boolean;
  onLikePress: () => void;
  isReposted?: boolean;
  onRepostPress: () => void;
  isSaved?: boolean;
  onSavePress: () => void;
  category: string;
}

const ActionsRow: React.FC<ActionsRowProps> = ({
  isLiked,
  onLikePress,
  isReposted,
  onRepostPress,
  isSaved,
  onSavePress,
  category,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.ActionsRowContainer>
      <Badge
        content={category}
        backgroundColor={theme.colors.purple_02}
        textColor={theme.colors.purple_04}
      />
      <S.RightActions>
        <LikeButton onPress={onLikePress} size={28} isLiked={isLiked} />
        <SaveButton onPress={onSavePress} size={28} isSaved={isSaved} />
        <S.RepostButtonContainer>
          <RepostButton onPress={onRepostPress} isReposted={isReposted} />
        </S.RepostButtonContainer>
      </S.RightActions>
    </S.ActionsRowContainer>
  );
};

export default ActionsRow;
