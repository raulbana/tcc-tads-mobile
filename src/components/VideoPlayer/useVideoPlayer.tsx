import {useState} from 'react';

const useVideoPlayer = () => {
  const [isPaused, setIsPaused] = useState(true);
  const togglePlayPause = () => setIsPaused(!isPaused);

  return {isPaused, togglePlayPause};
};

export default useVideoPlayer;
