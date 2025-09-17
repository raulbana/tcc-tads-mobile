import React from 'react';
import * as S from './styles';

export interface ImageCardProps {
  image: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({image, onClick}) => {
  return (
    <S.Container onPress={onClick}>
      <S.BackgroundImage
        source={{uri: image}}
        resizeMode="cover"></S.BackgroundImage>
    </S.Container>
  );
};

export default ImageCard;
