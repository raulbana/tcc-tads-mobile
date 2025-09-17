import React from 'react';
import * as S from './styles';
import useContentDetailsHeader from './useContentDetailsHeader';
import Icon from '../../../../../components/Icon/Icon';
import {VideoPlayer} from '../../../../../components/VideoPlayer/VideoPlayer';

export interface ContentDetailsHeaderProps {
  image: string;
  type: 'image' | 'video';
}

const ContentDetailsHeader: React.FC<ContentDetailsHeaderProps> = ({
  image,
  type,
}) => {
  const {goBack} = useContentDetailsHeader();

  return (
    <S.Container>
      {type === 'video' ? (
        <VideoPlayer url={image} />
      ) : (
        <S.ImageBackground
          source={{uri: image}}
          resizeMode="cover"
          style={{width: '100%', aspectRatio: 1.9}}
          imageStyle={{width: '100%', height: undefined}}>
          <S.GradientOverlay colors={['rgba(0,0,0,0.6)', 'transparent']} />
        </S.ImageBackground>
      )}
      <S.BackButtonContainer>
        <S.BackButton onPress={goBack}>
          <Icon name="ArrowLeft" size={36} color="white" />
        </S.BackButton>
      </S.BackButtonContainer>
    </S.Container>
  );
};

export default ContentDetailsHeader;
