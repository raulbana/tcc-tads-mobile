import React from 'react';
import * as S from './styles';
import useContentDetailsHeader from './useContentDetailsHeader';
import {Dimensions} from 'react-native';
import Icon from '../../../../../components/Icon/Icon';

export interface ContentDetailsHeaderProps {
  image: number | {uri: string};
}

const ContentDetailsHeader: React.FC<ContentDetailsHeaderProps> = ({image}) => {
  const {goBack} = useContentDetailsHeader();
  const screenWidth = Dimensions.get('window').width;

  return (
    <S.Container>
      <S.ImageBackground
        source={image}
        resizeMode="cover"
        style={{width: '100%', aspectRatio: 1.9}}
        imageStyle={{width: screenWidth, height: undefined}}>
        <S.BackButtonContainer>
          <S.BackButton onPress={goBack}>
            <Icon name="ArrowLeft" size={36} color='white' />
          </S.BackButton>
        </S.BackButtonContainer>
      </S.ImageBackground>
    </S.Container>
  );
};

export default ContentDetailsHeader;
