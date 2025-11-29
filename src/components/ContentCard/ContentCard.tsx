import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import Badge from '../Badge/Badge';
import {useContentCard} from './useContentCard';

export interface ContentCardProps {
  image: number | {uri: string};
  badgeLabel: string;
  title: string;
  description: string;
  onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  image,
  badgeLabel,
  title,
  onClick,
}) => {
  const {gradientColors, textColor, theme} = useContentCard();

  return (
    <S.Container onPress={onClick}>
      <S.BackgroundImage
        source={image}
        imageStyle={{width: '100%', height: '100%', borderRadius: 16}}
        resizeMode="cover">
        <S.GradientOverlay colors={gradientColors} />
        <S.BadgeContainer>
          <Badge content={badgeLabel} />
        </S.BadgeContainer>
        <S.Content>
          <Label
            typography={theme.typography.paragraph.b3}
            color={textColor}
            text={title}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </S.Content>
      </S.BackgroundImage>
    </S.Container>
  );
};

export default ContentCard;
