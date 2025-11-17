import React, {useCallback, useMemo, useEffect} from 'react';
import {Platform} from 'react-native';
import * as S from './styles';
import {UploadFile, useUpload} from './useUpload';
import Icon from '../../../../../../components/Icon/Icon';
import Label from '../../../../../../components/Label/Label';
import {verticalScale} from '../../../../../../utils/scales';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDynamicTheme} from '../../../../../../hooks/useDynamicTheme';
import useDialogModal from '../../../../../../hooks/useDialogModal';

interface UploadBoxProps {
  allowedTypes?: ('image' | 'video')[];
  onRemoveFile: (file: UploadFile) => void;
  onUpdateFiles: (files: UploadFile[]) => void;
  onReorderFiles: (files: UploadFile[]) => void;
  title: string;
  description: string;
  parentScrollRef?: any;
  externalError?: string;
  initialFiles?: UploadFile[];
}

const UploadBox: React.FC<UploadBoxProps> = ({
  allowedTypes = ['image', 'video'],
  onRemoveFile,
  onUpdateFiles,
  onReorderFiles,
  title,
  description,
  parentScrollRef,
  externalError,
  initialFiles = [],
}) => {
  const {DialogPortal, showDialog} = useDialogModal();
  const {files, pickFile, removeFile, reorderFiles, listRef, error} = useUpload(
    allowedTypes,
    initialFiles,
    {showDialog},
  );

  const displayError = externalError || error;

  const theme = useDynamicTheme();

  const renderUpload = useCallback(
    ({item, drag, isActive}: RenderItemParams<UploadFile>) => {
      const isVideo = item.type.startsWith('video');
      const isDraggable = !isVideo;

      return (
        <S.DraggableItem
          isActive={isActive}
          isDraggable={isDraggable}
          onLongPress={isDraggable ? drag : undefined}
          delayLongPress={200}
          disabled={!isDraggable}>
          <S.CardContainer>
            <S.IconWrapper>
              <Icon
                name={isVideo ? 'VideoCamera' : 'ImageSquare'}
                size={28}
                color={theme.colors.purple_04}
                weight="bold"
              />
            </S.IconWrapper>

            <S.InfoWrapper>
              <Label
                text={item.fileName}
                typography={theme.typography.paragraph.sb2}
                color={theme.colors.gray_08}
                numberOfLines={1}
              />
              <Label
                text={`${(item.fileSize / 1024 / 1024).toFixed(2)} MB`}
                typography={theme.typography.paragraph.sm2}
                color={theme.colors.gray_06}
              />
            </S.InfoWrapper>

            <S.RemoveButton
              onPress={() => {
                removeFile(item.id);
                onRemoveFile(item);
              }}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <Icon
                name="X"
                size={20}
                color={theme.colors.error}
                weight="bold"
              />
            </S.RemoveButton>
          </S.CardContainer>
        </S.DraggableItem>
      );
    },
    [removeFile, onRemoveFile, theme],
  );

  const hasThumbnail = useMemo(
    () =>
      files.length > 0 &&
      allowedTypes.includes('image') &&
      files[0].type.startsWith('image'),
    [files, allowedTypes],
  );

  const keyExtractor = useCallback((item: UploadFile) => item.id, []);

  return (
    <S.Wrapper>
      {hasThumbnail && (
        <S.ThumbnailContainer>
          <S.ThumbnailPreview source={{uri: files[0].uri}} resizeMode="cover">
            <S.ThumbnailGradient
              colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0)']}
            />
            <S.ThumbnailPreviewText>
              <Label
                text={title}
                typography={theme.typography.paragraph.sb3}
                color={theme.colors.white}
                numberOfLines={1}
              />
            </S.ThumbnailPreviewText>
          </S.ThumbnailPreview>
        </S.ThumbnailContainer>
      )}

      <S.Container onPress={pickFile} hasError={!!displayError}>
        <Icon name="UploadSimple" size={32} color={theme.colors.purple_04} />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text="Carregar Imagem ou Vídeo"
        />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text="Formato: jpg, png, mp4 / Max 500mb"
        />
      </S.Container>

      {displayError && (
        <Label
          typography={theme.typography.paragraph.sm1}
          color={theme.colors.error}
          text={displayError}
        />
      )}

      {files.length > 0 && (
        <>
          {files.length > 1 && (
            <S.HintContainer>
              <Icon
                name="Lightbulb"
                size={20}
                color={theme.colors.purple_04}
                weight="bold"
              />
              <Label
                text="Dica: Arraste a imagem que você quer como capa para o primeiro lugar da lista! 👆"
                typography={theme.typography.paragraph.sm2}
                color={theme.colors.gray_07}
                style={{flex: 1}}
              />
            </S.HintContainer>
          )}
          <S.ListContainer>
            <GestureHandlerRootView
              style={{width: '100%', overflow: 'visible'}}>
              <DraggableFlatList
                ref={listRef}
                data={files}
                keyExtractor={keyExtractor}
                contentContainerStyle={{paddingVertical: verticalScale(8)}}
                renderItem={renderUpload}
                dragItemOverflow={true}
                activationDistance={Platform.OS === 'android' ? 15 : 10}
                scrollEnabled={false}
                style={{overflow: 'visible'}}
                nestedScrollEnabled={Platform.OS === 'android'}
                simultaneousHandlers={
                  parentScrollRef ? [parentScrollRef] : undefined
                }
                dragHitSlop={
                  Platform.OS === 'android' ? {top: 10, bottom: 10} : undefined
                }
                onDragBegin={() => {
                  if (Platform.OS === 'android' && parentScrollRef?.current) {
                    parentScrollRef.current.setNativeProps({
                      scrollEnabled: false,
                    });
                  }
                }}
                onDragEnd={({data}) => {
                  if (Platform.OS === 'android' && parentScrollRef?.current) {
                    parentScrollRef.current.setNativeProps({
                      scrollEnabled: true,
                    });
                  }
                  reorderFiles(data);
                  onReorderFiles(data);
                  onUpdateFiles(data);
                }}
              />
            </GestureHandlerRootView>
          </S.ListContainer>
        </>
      )}
      {DialogPortal}
    </S.Wrapper>
  );
};

export default UploadBox;
