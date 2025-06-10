import * as S from './style';
import Label from '../../components/Label/Label';
import theme from '../../theme/theme';
const Home = () => {
  return (
    <S.Container>
      <Label
        typography={theme.typography.title.h1}
        text={'Home'}
        color={theme.colors.purple_02}
      />
    </S.Container>
  );
};

export default Home;
