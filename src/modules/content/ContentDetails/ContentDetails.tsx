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
import ReportModal from '../../../components/ReportModal/ReportModal';
import {useDynamicTheme} from '../../../hooks/useDynamicTheme';
import {Modal} from 'react-native';
import Button from '../../../components/Button/Button';

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
    reportContentId,
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

  return isLoading || !content ? (
    <Loader overlay />
  ) : (
    <ScreenContainer
      headerShown
      fullBleed
      scrollable
      header={
        <ContentDetailsHeader
          image={
            content?.media?.find(m => m?.contentType?.startsWith('video/'))
              ?.url ?? content?.cover?.url
          }
          type={
            content.media?.find(m => m?.contentType?.startsWith('video/'))
              ? 'video'
              : 'image'
          }
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
            text={content.description}
            textAlign="justify"
          />
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
          category={
            content?.categories?.length > 0
              ? content.categories[0]
              : 'Sem categoria'
          }
        />
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
        />
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
      <Modal
        transparent
        animationType="fade"
        visible={isDeleteCommentModalVisible}
        onRequestClose={handleCloseDeleteCommentModal}>
        <S.ModalOverlay>
          <S.ModalCard>
            <Label
              typography={theme.typography.title.b3}
              color={theme.colors.gray_08}
              text="Excluir comentário"
            />
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_06}
              text="Tem certeza que deseja excluir este comentário? Essa ação não pode ser desfeita."
            />
            <S.ModalActions>
              <Button
                type="TERTIARY"
                text="Cancelar"
                onPress={handleCloseDeleteCommentModal}
                disabled={isDeletingComment}
              />
              <Button
                type="PRIMARY"
                text="Excluir"
                onPress={handleConfirmDeleteComment}
                loading={isDeletingComment}
              />
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      </Modal>
    </ScreenContainer>
  );
};

export default ContentDetails;
