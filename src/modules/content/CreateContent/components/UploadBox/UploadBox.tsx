import React, {useCallback, useMemo} from 'react';
import * as S from './styles';
import {UploadFile, useUpload} from './useUpload';
import Icon from '../../../../../components/Icon/Icon';
import theme from '../../../../../theme/theme';
import UploadCardRow from '../../../../../components/UploadCardRow/UploadCardRow';
import Label from '../../../../../components/Label/Label';
import {verticalScale} from '../../../../../utils/scales';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {
  GestureHandlerRootView,
  Gesture,
  State,
} from 'react-native-gesture-handler';

interface UploadBoxProps {
  allowedTypes?: ('image' | 'video')[];
  onSubmitFiles: (files: UploadFile[]) => void;
  onRemoveFile: (file: UploadFile) => void;
  onReorderFiles: (files: UploadFile[]) => void;
  onUpdateFiles: (files: UploadFile[]) => void;
  title: string;
  description: string;
  parentScrollRef?: any;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  allowedTypes = ['image', 'video'],
  onSubmitFiles,
  onRemoveFile,
  onReorderFiles,
  onUpdateFiles,
  title,
  description,
  parentScrollRef,
}) => {
  const {files, pickFile, removeFile, reorderFiles, listRef} =
    useUpload(allowedTypes);

  const renderUpload = useCallback(
    ({item, drag, isActive}: RenderItemParams<UploadFile>) => (
      <S.DraggableItem
        isActive={isActive}
        onLongPress={drag}
        delayLongPress={200}>
        <S.CardContainer>
          <S.IconWrapper>
            <Icon
              name="ImageSquare"
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
            onPress={() => removeFile(item.id)}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <Icon name="X" size={20} color={theme.colors.error} weight="bold" />
          </S.RemoveButton>
        </S.CardContainer>
      </S.DraggableItem>
    ),
    [removeFile],
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
          <S.ThumbnailPreviewText></S.ThumbnailPreviewText>
          <S.ThumbnailGradient colors={['rgba(0,0,0,0.6)', 'transparent']} />
          <S.ThumbnailPreview source={{uri: files[0].uri}} resizeMode="cover" />
        </S.ThumbnailContainer>
      )}

      <S.Container onPress={pickFile}>
        <Icon name="UploadSimple" size={32} color={theme.colors.purple_04} />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text="Carregar Imagem ou Vídeo"
        />
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_07}
          text="Formato: jpg, png, mp4 / Max 10mb"
        />
      </S.Container>

      {files.length > 0 && (
        <S.ListContainer>
          <GestureHandlerRootView style={{width: '100%', overflow: 'visible'}}>
            <DraggableFlatList
              ref={listRef}
              data={files}
              keyExtractor={keyExtractor}
              contentContainerStyle={{paddingVertical: verticalScale(8)}}
              renderItem={renderUpload}
              onDragEnd={({data}) => reorderFiles(data)}
              dragItemOverflow={true}
              activationDistance={10}
              scrollEnabled={false}
              style={{overflow: 'visible'}}
              nestedScrollEnabled={true}
              simultaneousHandlers={
                parentScrollRef ? [parentScrollRef] : undefined
              }
            />
          </GestureHandlerRootView>
        </S.ListContainer>
      )}
    </S.Wrapper>
  );
};

export default UploadBox;
