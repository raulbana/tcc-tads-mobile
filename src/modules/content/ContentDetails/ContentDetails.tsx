import React from 'react';
import Button from '../../../components/Button/Button';
import CarouselSection from '../../../components/CarouselSection.tsx/CarouselSection';
import Icon from '../../../components/Icon/Icon';
import Label from '../../../components/Label/Label';
import Loader from '../../../components/Loader/Loader';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import theme from '../../../theme/theme';
import ActionsRow from './components/ActionsRow/ActionsRow';
import ContentDetailsHeader from './components/ContentDetailsHeader/ContentDetailsHeader';
import * as S from './styles';
import useContentDetails from './useContentDetails';
import ImageCard from '../../../components/ImageCard/ImageCard';
import CommentSection from '../../../components/CommentSection/CommentSection';

const ContentDetails = () => {
  const {
    isLiked,
    toggleLike,
    isReposted,
    toggleRepost,
    isLoading,
    comments,
    commentText,
    onChangeCommentText,
    onSendComment,
    content,
    onReplyComment,
    onLikeCommentOrReply,
  } = useContentDetails();

  return isLoading || !content ? (
    <Loader overlay />
  ) : (
    <ScreenContainer
      headerShown
      fullBleed
      scrollable
      header={
        <ContentDetailsHeader
          image={{
            uri: content.coverUrl,
          }}
        />
      }>
      <S.Wrapper>
        <ActionsRow
          isLiked={isLiked}
          onLikePress={toggleLike}
          isReposted={isReposted}
          onRepostPress={toggleRepost}
          category={content.category}
        />
        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          text={content.title}
        />
        {content.description && (
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_08}
            text={content.description}
            textAlign="justify"
          />
        )}
        {content.subtitle && (
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.gray_08}
            text={content.subtitle}
          />
        )}
        {content.subcontent && (
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_08}
            text={content.subcontent}
            textAlign="justify"
          />
        )}

        {content.videos.length > 0 && (
          <Button
            text={
              <S.Row>
                <Label
                  typography={theme.typography.paragraph.sb3}
                  color={theme.colors.white}
                  text={'Vídeos'}
                />
                <Icon
                  name="Play"
                  weight="fill"
                  size={16}
                  color={theme.colors.white}
                />
              </S.Row>
            }
            onPress={() => {}}
          />
        )}
        <CarouselSection
          carouselData={{
            data: content.images,
            itemWidth: 160,
            renderItem: ({item}) => (
              <ImageCard image={item} onClick={() => {}} />
            ),
          }}
          sectionTitle={'Imagens'}
        />
        <CommentSection
          comments={comments}
          onCommentSend={onSendComment}
          onCommentTextChange={onChangeCommentText}
          commentText={commentText}
          onPressLike={onLikeCommentOrReply}
          onPressReply={onReplyComment}
        />
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default ContentDetails;
