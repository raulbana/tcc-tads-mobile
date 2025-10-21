import React from 'react';
import CarouselSection from '../../../components/CarouselSection.tsx/CarouselSection';
import Label from '../../../components/Label/Label';
import Loader from '../../../components/Loader/Loader';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import ActionsRow from './components/ActionsRow/ActionsRow';
import ContentDetailsHeader from './components/ContentDetailsHeader/ContentDetailsHeader';
import * as S from './styles';
import useContentDetails from './useContentDetails';
import ImageCard from '../../../components/ImageCard/ImageCard';
import CommentSection from '../../../components/CommentSection/CommentSection';
import ImageCarouselModal from './components/ImageCarouselModal/ImageCarouselModal';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

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
    contentData,
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

  const theme = useDynamicTheme();
  
  return isLoading || !contentData ? (
    <Loader overlay />
  ) : (
    <ScreenContainer
      headerShown
      fullBleed
      scrollable
      header={
        <ContentDetailsHeader
          image={contentData.video ?? contentData.coverUrl}
          type={contentData.video ? 'video' : 'image'}
        />
      }>
      <S.Wrapper>
        <Label
          typography={theme.typography.title.b3}
          color={theme.colors.gray_08}
          text={contentData.title}
        />
        {contentData.description && (
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_08}
            text={contentData.description}
            textAlign="justify"
          />
        )}

        <CarouselSection
          carouselData={{
            data: contentData?.images ?? [],
            itemWidth: 140,
            renderItem: ({item}) => (
              <ImageCard
                image={item}
                onClick={() => {
                  setImageCarouselVisible(true);
                  setImageCarouselIndex(
                    typeof contentData?.images?.indexOf(item) === 'number' &&
                      contentData?.images?.indexOf(item) !== -1
                      ? contentData.images.indexOf(item)
                      : 0,
                  );
                }}
              />
            ),
          }}
          sectionTitle={''}
        />
        {contentData.subtitle && (
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.gray_08}
            text={contentData.subtitle}
          />
        )}
        {contentData.subcontent && (
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_08}
            text={contentData.subcontent}
            textAlign="justify"
          />
        )}
        <ActionsRow
          isLiked={isLiked}
          onLikePress={toggleLike}
          isReposted={isReposted}
          onRepostPress={toggleRepost}
          category={contentData.category.name}
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
        images={contentData.images ?? []}
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
