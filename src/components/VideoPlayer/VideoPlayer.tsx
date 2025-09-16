import React, {useState} from 'react';
import * as S from './styles';

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({url}) => {
  const [paused, setPaused] = useState(true);

  return (
    <S.Container onPress={() => setPaused(!paused)}>
      <S.Overlay>
        <S.VideoPlayer
          source={{uri: url}}
          resizeMode="contain"
          paused={paused}
          controls={!paused}
        />
        {paused && <S.PlayButton>▶</S.PlayButton>}
      </S.Overlay>
    </S.Container>
  );
};
