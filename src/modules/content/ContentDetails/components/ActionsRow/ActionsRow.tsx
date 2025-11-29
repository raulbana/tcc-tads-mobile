import Badge from '../../../../../components/Badge/Badge';
import LikeButton from '../../../../../components/LikeButton/LikeButton';
import SaveButton from '../../../../../components/SaveButton/SaveButton';
import Label from '../../../../../components/Label/Label';
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
  likesCount?: number;
}

const ActionsRow: React.FC<ActionsRowProps> = ({
  isLiked,
  onLikePress,
  isReposted,
  onRepostPress,
  isSaved,
  onSavePress,
  category,
  likesCount = 0,
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
        <S.LikeContainer>
        <LikeButton onPress={onLikePress} size={28} isLiked={isLiked} />
          {likesCount > 0 && (
            <Label
              typography={theme.typography.paragraph.sm2}
              color={isLiked ? theme.colors.purple_03 : theme.colors.gray_06}
              text={likesCount.toString()}
            />
          )}
        </S.LikeContainer>
        <SaveButton onPress={onSavePress} size={28} isSaved={isSaved} />
      </S.RightActions>
    </S.ActionsRowContainer>
  );
};

export default ActionsRow;
