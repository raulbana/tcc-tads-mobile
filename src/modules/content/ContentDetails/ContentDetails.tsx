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
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';

const ContentDetails = () => {
  const {
    content,
    comments,
    commentText,
    setCommentText,
    replyTo,
    replyText,
    setReplyText,
    imageCarouselVisible,
    imageCarouselIndex,
    isLoading,
    handleToggleLike,
    handleToggleRepost,
    handleToggleSave,
    handleSendComment,
    handleLikeComment,
    handleReplyToComment,
    handleCancelReply,
    handleCloseImageCarousel,
    setImageCarouselIndex,
  } = useContentDetails();

  const theme = useDynamicTheme();

  return isLoading || !content ? (
    <Loader overlay />
  ) : (
    <ScreenContainer
      headerShown
      fullBleed
      scrollable
      header={
        <ContentDetailsHeader
          image={content.media?.[0]?.url ?? content.cover?.url}
          type={content.media?.[0]?.contentType.startsWith('video/') ? 'video' : 'image'}
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
            data: content?.media.filter(media => media.contentType.startsWith('image/')) ?? [],
            itemWidth: 140,
            renderItem: ({item}) => <ImageCard image={item.url} onClick={() => {}} />,
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
          isLiked={content.isLiked}
          onLikePress={handleToggleLike}
          isReposted={content.isReposted}
          onRepostPress={handleToggleRepost}
          isSaved={content.isSaved}
          onSavePress={handleToggleSave}
          category={content?.categories?.length > 0 ? content.categories[0] : 'Sem categoria'}
        />
        <CommentSection
          comments={comments}
          onCommentSend={handleSendComment}
          onCommentTextChange={setCommentText}
          commentText={commentText}
          onPressLike={handleLikeComment}
          onPressReply={handleReplyToComment}
          disabled={false}
          loading={false}
          replyTo={replyTo}
          replyText={replyText}
          setReplyText={setReplyText}
          setReplyTo={handleCancelReply}
        />
      </S.Wrapper>
      <ImageCarouselModal
        images={
          content.media
            .filter(media => media.contentType.startsWith('image/'))
            .map(media => media.url) ?? []
        }
        isVisible={imageCarouselVisible}
        onClose={handleCloseImageCarousel}
        currentIndex={imageCarouselIndex}
        onChangeIndex={setImageCarouselIndex}
      />
    </ScreenContainer>
  );
};

export default ContentDetails;
