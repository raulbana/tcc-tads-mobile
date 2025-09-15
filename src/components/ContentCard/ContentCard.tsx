import React from 'react';
import * as S from './styles';
import Label from '../Label/Label';
import theme from '../../theme/theme';
import Badge from '../Badge/Badge';

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
  return (
    <S.Container onPress={onClick}>
      <S.BackgroundImage
        source={image}
        imageStyle={{width: '100%', height: '100%', borderRadius: 16}}
        resizeMode="cover">
        <S.BadgeContainer>
          <Badge content={badgeLabel} />
        </S.BadgeContainer>
        <S.Content>
          <Label
            typography={theme.typography.title.b4}
            color={theme.colors.white}
            text={title}
          />
          <Label
            typography={theme.typography.paragraph.r2}
            color={theme.colors.white}
            text={description}
          />
        </S.Content>
      </S.BackgroundImage>
    </S.Container>
  );
};

export default ContentCard;
