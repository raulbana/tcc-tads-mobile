import React, {useRef} from 'react';
import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import theme from '../../../theme/theme';
import UploadContentForm from './components/UploadContentForm/UploadContentForm';
import * as S from './styles';

const CreateContent = () => {
  const scrollRef = useRef<any>(null);

  return (
    <ScreenContainer scrollable={true} ref={scrollRef}>
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
