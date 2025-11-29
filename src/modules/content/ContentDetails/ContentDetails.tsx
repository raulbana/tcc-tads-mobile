import React, {useCallback, useEffect, useRef} from 'react';
import {LayoutChangeEvent, ScrollView, TextInput} from 'react-native';
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
import ReportModal from '../../../components/ReportModal/ReportModal';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import DialogModal from '../../../components/DialogModal/DialogModal';

const ContentDetails = () => {
  const {
    content,
    comments,
    commentText,
    setCommentText,
    replyTo,
    replyText,
    setReplyText,
    setReplyTo,
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
    handleImagePress,
    handleLoadReplies,
    handleOpenReportModal,
    handleCloseReportModal,
    handleReportContent,
    reportModalVisible,
    isReporting,
    currentUserId,
    handleOpenDeleteCommentModal,
    handleCloseDeleteCommentModal,
    handleConfirmDeleteComment,
    isDeleteCommentModalVisible,
    isDeletingComment,
    authorId,
  } = useContentDetails();

  const theme = useDynamicTheme();
  const scrollRef = useRef<ScrollView | null>(null);
  const commentInputOffsetRef = useRef(0);
  const commentInputRef = useRef<TextInput>(null);

  const handleCommentSectionLayout = useCallback((event: LayoutChangeEvent) => {
    commentInputOffsetRef.current = event.nativeEvent.layout.y;
  }, []);

  useEffect(() => {
    if (replyTo && scrollRef.current && commentInputOffsetRef.current > 0) {
      const targetOffset = Math.max(commentInputOffsetRef.current - 24, 0);
      scrollRef.current.scrollTo({y: targetOffset, animated: true});

      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 300);
    }
  }, [replyTo]);

  const videoMedia = content?.media?.find(m =>
    m?.contentType?.startsWith('video/'),
  );

  return isLoading || !content ? (
    <Loader overlay />
  ) : (
    <ScreenContainer
      ref={scrollRef}
      headerShown
      fullBleed
      scrollable
      header={
        <ContentDetailsHeader
          image={videoMedia?.url ?? content?.cover?.url}
          type={videoMedia ? 'video' : 'image'}
          onReport={() => handleOpenReportModal(content.id)}
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
            textAlign="justify">
            {content.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < content.description.split('\n').length - 1 && '\n'}
              </React.Fragment>
            ))}
          </Label>
        )}

        <CarouselSection
          carouselData={{
            data:
              content?.media?.filter(m =>
                m?.contentType?.startsWith('image/'),
              ) ?? [],
            itemWidth: 140,
            renderItem: ({item, index}) => (
              <ImageCard
                image={item.url}
                onClick={() => handleImagePress(index)}
              />
            ),
          }}
          sectionTitle={''}
        />
        {content.subtitle && (
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.gray_08}>
            {(() => {
              const lines = (content.subtitle ?? '').split('\n');
              return lines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < lines.length - 1 && '\n'}
                </React.Fragment>
              ));
            })()}
          </Label>
        )}
        {content.subcontent && (
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.gray_08}
            textAlign="justify">
            {(() => {
              const lines = (content.subcontent ?? '').split('\n');
              return lines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < lines.length - 1 && '\n'}
                </React.Fragment>
              ));
            })()}
          </Label>
        )}
        <ActionsRow
          isLiked={content.isLiked}
          onLikePress={handleToggleLike}
          isReposted={content.isReposted}
          onRepostPress={handleToggleRepost}
          isSaved={content.isSaved}
          onSavePress={handleToggleSave}
          category={
            content?.categories?.length > 0
              ? content.categories[0]
              : 'Sem categoria'
          }
          likesCount={content.likesCount}
        />
        <S.CommentSectionAnchor onLayout={handleCommentSectionLayout}>
          <CommentSection
            comments={comments}
            onCommentSend={handleSendComment}
            onCommentTextChange={setCommentText}
            commentText={commentText}
            onPressLike={handleLikeComment}
            onPressReply={handleReplyToComment}
            onLoadReplies={handleLoadReplies}
            disabled={false}
            loading={false}
            replyTo={replyTo}
            replyText={replyText}
            setReplyText={setReplyText}
            setReplyTo={setReplyTo}
            currentUserId={currentUserId}
            contentOwnerId={authorId}
            onRequestDelete={handleOpenDeleteCommentModal}
            commentInputRef={commentInputRef as React.RefObject<TextInput>}
          />
        </S.CommentSectionAnchor>
      </S.Wrapper>
      <ImageCarouselModal
        images={
          content.media
            ?.filter(media => media?.contentType?.startsWith('image/'))
            .map(media => media.url) ?? []
        }
        isVisible={imageCarouselVisible}
        onClose={handleCloseImageCarousel}
        currentIndex={imageCarouselIndex}
        onChangeIndex={setImageCarouselIndex}
      />
      <ReportModal
        isVisible={reportModalVisible}
        onClose={handleCloseReportModal}
        onReport={handleReportContent}
        isLoading={isReporting}
      />
      <DialogModal
        visible={isDeleteCommentModalVisible}
        onClose={handleCloseDeleteCommentModal}
        title="Excluir comentário"
        description="Tem certeza que deseja excluir este comentário? Essa ação não pode ser desfeita."
        secondaryButton={{
          label: 'Cancelar',
          onPress: handleCloseDeleteCommentModal,
          disabled: isDeletingComment,
          type: 'SECONDARY',
        }}
        primaryButton={{
          label: 'Excluir',
          onPress: handleConfirmDeleteComment,
          loading: isDeletingComment,
          type: 'PRIMARY',
        }}
      />
    </ScreenContainer>
  );
};

export default ContentDetails;
