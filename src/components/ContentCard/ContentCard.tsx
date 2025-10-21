import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import Badge from '../Badge/Badge';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

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
  description,
  onClick,
}) => {
  const theme = useDynamicTheme();

  return (
    <S.Container onPress={onClick}>
      <S.BackgroundImage
        source={image}
        imageStyle={{width: '100%', height: '100%', borderRadius: 16}}
        resizeMode="cover">
        <S.GradientOverlay
          colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0)']}
        />
        <S.BadgeContainer>
          <Badge content={badgeLabel} />
        </S.BadgeContainer>
        <S.Content>
          <Label
            typography={theme.typography.paragraph.b3}
            color={theme.colors.white}
            text={title}
          />
        </S.Content>
      </S.BackgroundImage>
    </S.Container>
  );
};

export default ContentCard;
