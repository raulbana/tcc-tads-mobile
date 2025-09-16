import React, {useState} from 'react';
import * as S from './styles';
import useVideoPlayer from './useVideoPlayer';

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({url}) => {
  const {isPaused, togglePlayPause} = useVideoPlayer();

  return (
    <S.Container onPress={togglePlayPause}>
      <S.Overlay>
        <S.VideoPlayer
          source={{uri: url}}
          resizeMode="contain"
          paused={isPaused}
          controls={!isPaused}
        />
        {isPaused && <S.PlayButton>▶</S.PlayButton>}
      </S.Overlay>
    </S.Container>
  );
};
