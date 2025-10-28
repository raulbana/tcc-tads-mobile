import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Content} from '../../../../../types/content';
import PostCard from '../PostCard/PostCard';
import EmptyState from '../EmptyState/EmptyState';
import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';

export interface PostListProps {
  posts: Content[];
  isDeleting: boolean;
  onDeletePost: (postId: string) => void;
  onRefresh: () => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  isDeleting,
  onDeletePost,
  onRefresh,
}) => {
  const renderPost = ({item}: {item: Content}) => (
    <PostCard post={item} onDelete={onDeletePost} isDeleting={isDeleting} />
  );

  const keyExtractor = (item: Content) => item.id;

  if (posts.length === 0) {
    return <EmptyState onRefresh={onRefresh} />;
  }

  const theme = useDynamicTheme();

  return (
    <S.Container>
      <Label
        text="Suas Postagens"
        typography={theme.typography.title.b2}
        color={theme.colors.gray_08}
      />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={S.listContentStyle}
      />
    </S.Container>
  );
};

export default PostList;
