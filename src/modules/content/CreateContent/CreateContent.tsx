import Label from '../../../components/Label/Label';
import ScreenContainer from '../../../components/ScreenContainer/ScreenContainer';
import theme from '../../../theme/theme';
import UploadBox from './components/UploadBox/UploadBox';
import * as S from './styles';

const CreateContent = () => {
  return (
    <ScreenContainer>
      <S.Wrapper>
        <S.Header>
          <Label
            typography={theme.typography.title.b3}
            text="Novo Post"
            color={theme.colors.gray_08}
          />
        </S.Header>
        <UploadBox />
      </S.Wrapper>
    </ScreenContainer>
  );
};

export default CreateContent;
