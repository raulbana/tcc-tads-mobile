import React from 'react';
import CarouselSection from '../../../components/CarouselSection.tsx/CarouselSection';
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
import ImageCarouselModal from './components/ImageCarouselModal/ImageCarouselModal';

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
    content,
    onReplyComment,
    onLikeCommentOrReply,
    handleSend,
    replyTo,
    replyText,
    setReplyText,
    setReplyTo,
    imageCarouselVisible,
    setImageCarouselVisible,
    imageCarouselIndex,
    setImageCarouselIndex,
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
          image={content.video ?? content.coverUrl}
          type={content.video ? 'video' : 'image'}
        />
      }>
      <S.Wrapper>
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

        <CarouselSection
          carouselData={{
            data: content?.images ?? [],
            itemWidth: 140,
            renderItem: ({item}) => (
              <ImageCard
                image={item}
                onClick={() => {
                  setImageCarouselVisible(true);
                  setImageCarouselIndex(
                    typeof content?.images?.indexOf(item) === 'number' &&
                      content?.images?.indexOf(item) !== -1
                      ? content.images.indexOf(item)
                      : 0,
                  );
                }}
              />
            ),
          }}
          sectionTitle={''}
        />
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
        <ActionsRow
          isLiked={isLiked}
          onLikePress={toggleLike}
          isReposted={isReposted}
          onRepostPress={toggleRepost}
          category={content.category}
        />
        <CommentSection
          comments={comments}
          onCommentSend={handleSend}
          onCommentTextChange={onChangeCommentText}
          commentText={commentText}
          onPressLike={onLikeCommentOrReply}
          onPressReply={onReplyComment}
          disabled={false}
          loading={false}
          replyTo={replyTo}
          replyText={replyText}
          setReplyText={setReplyText}
          setReplyTo={setReplyTo}
        />
      </S.Wrapper>
      <ImageCarouselModal
        images={content.images ?? []}
        isVisible={imageCarouselVisible}
        onClose={() => {
          setImageCarouselVisible(false);
        }}
        currentIndex={imageCarouselIndex}
        onChangeIndex={setImageCarouselIndex}
      />
    </ScreenContainer>
  );
};

export default ContentDetails;
