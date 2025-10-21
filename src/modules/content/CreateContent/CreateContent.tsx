import React, {useRef} from 'react';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import UploadContentForm from './components/UploadContentForm/UploadContentForm';
import * as S from './styles';
import useCreateContent from './useCreateContent';
import { useDynamicTheme } from '../../../hooks/useDynamicTheme';

const CreateContent = () => {
  const scrollRef = useRef<any>(null);
  const {goBack} = useCreateContent();
  const theme = useDynamicTheme();
  
  return (
    <ScreenContainer scrollable={true} ref={scrollRef} goBackTo="Conteúdos" goBack={goBack} headerShown>
      <S.Wrapper>
        <S.Header>
          <Label
            typography={theme.typography.title.b3}
            text="Novo Post"
            color={theme.colors.gray_08}
          />
        </S.Header>
        <UploadContentForm parentScrollRef={scrollRef} />
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default CreateContent;
