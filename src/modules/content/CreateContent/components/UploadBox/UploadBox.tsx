import React, {useCallback} from 'react';
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface UploadBoxProps {
  allowedTypes?: ('image' | 'video')[];
}

const UploadBox: React.FC<UploadBoxProps> = ({
  allowedTypes = ['image', 'video'],
}) => {
  const {files, pickFile, removeFile, reorderFiles} = useUpload(allowedTypes);

  const renderUpload = ({item, drag, isActive}: RenderItemParams<UploadFile>) =>
    files &&
    files.length > 0 && (
      <S.DraggableWrapper onPress={drag} disabled={isActive}>
        <UploadCardRow
          fileName={item.fileName}
          fileSize={`${(item.fileSize / 1024 / 1024).toFixed(2)} MB`}
          onPress={drag}
          onRemove={() => removeFile(files.indexOf(item))}
        />
      </S.DraggableWrapper>
    );

  const hasThumbnail =
    files &&
    files.length > 0 &&
    allowedTypes.includes('image') &&
    files[0].type.startsWith('image');

  return (
    <S.Wrapper>
      {hasThumbnail ? (
        <S.ThumbnailPreview source={{uri: files![0].uri}} resizeMode="cover" />
      ) : null}

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

      {files && files.length > 0 && (
        <S.ListContainer>
          <GestureHandlerRootView style={{width: '100%'}}>
            <DraggableFlatList
              data={files}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={{paddingVertical: verticalScale(8)}}
              renderItem={renderUpload}
              onDragEnd={({data}) => reorderFiles(data)}
            />
          </GestureHandlerRootView>
        </S.ListContainer>
      )}
    </S.Wrapper>
  );
};

export default UploadBox;
