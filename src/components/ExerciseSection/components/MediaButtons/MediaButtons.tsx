import React from 'react';
import * as S from './styles';
import Icon from '../../../Icon/Icon';
import Label from '../../../Label/Label';
import { useDynamicTheme } from '../../../../hooks/useDynamicTheme';


export interface MediaButtonsProps {
  hasVideos?: boolean;
  hasImages?: boolean;
  onVideosPress?: () => void;
  onImagesPress?: () => void;
  activeTab?: 'videos' | 'images';
}

const MediaButtons: React.FC<MediaButtonsProps> = ({
  hasVideos = false,
  hasImages = false,
  onVideosPress,
  onImagesPress,
  activeTab = 'videos',
}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Container>
      <S.Button
        onPress={onVideosPress}
        isActive={activeTab === 'videos'}
        disabled={!hasVideos}>
        <Icon
          name="PlayCircle"
          size={20}
          color={
            activeTab === 'videos' ? theme.colors.white : theme.colors.gray_08
          }
          weight="regular"
        />
        <Label
          text="Vídeos"
          typography={theme.typography.paragraph.m3}
          color={
            activeTab === 'videos' ? theme.colors.white : theme.colors.gray_08
          }
        />
      </S.Button>

      <S.Button
        onPress={onImagesPress}
        isActive={activeTab === 'images'}
        disabled={!hasImages}>
        <Icon
          name="Image"
          size={20}
          color={
            activeTab === 'images' ? theme.colors.white : theme.colors.gray_08
          }
          weight="regular"
        />
        <Label
          text="Imagens"
          typography={theme.typography.paragraph.m3}
          color={
            activeTab === 'images' ? theme.colors.white : theme.colors.gray_08
          }
        />
      </S.Button>
    </S.Container>
  );
};

export default MediaButtons;
