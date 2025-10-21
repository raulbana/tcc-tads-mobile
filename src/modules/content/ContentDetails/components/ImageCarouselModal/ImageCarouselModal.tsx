import React, {useState} from 'react';
import {Modal, FlatList} from 'react-native';
import * as S from './styles';
import Icon from '../../../../../components/Icon/Icon';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

export interface ImageCarouselModalProps {
  images: string[];
  isVisible: boolean;
  onClose: () => void;
  currentIndex?: number;
  onChangeIndex?: (index: number) => void;
}

const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
  images,
  isVisible: visible,
  currentIndex = 0,
  onClose: closeModal,
  onChangeIndex,
}) => {
  const nextImage = () => {
    if (currentIndex < images.length - 1) onChangeIndex?.(currentIndex + 1);
  };

  const prevImage = () => {
    if (currentIndex > 0) onChangeIndex?.(currentIndex - 1);
  };

  const theme = useDynamicTheme();
  
  return (
    <Modal visible={visible}>
      <S.ModalContainer>
        <S.FullImage
          source={{uri: images[currentIndex]}}
          resizeMode="contain"
        />

        <S.CloseBtn onPress={closeModal}>
          <Icon name="X" size={28} color={theme.colors.white} weight="bold" />
        </S.CloseBtn>

        {currentIndex > 0 && (
          <S.LeftArrow onPress={prevImage}>
            <Icon
              name="CaretLeft"
              size={36}
              color={theme.colors.white}
              weight="bold"
            />
          </S.LeftArrow>
        )}

        {currentIndex < images.length - 1 && (
          <S.RightArrow onPress={nextImage}>
            <Icon
              name="CaretRight"
              size={36}
              color={theme.colors.white}
              weight="bold"
            />
          </S.RightArrow>
        )}
      </S.ModalContainer>
    </Modal>
  );
};

export default ImageCarouselModal;
