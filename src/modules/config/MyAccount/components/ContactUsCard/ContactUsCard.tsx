import Icon from '../../../../../components/Icon/Icon';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import * as S from './styles';

const ContactUsCard = () => {
  return (
    <S.Outer>
      <S.Container>
        <S.ContentRow>
          <S.TextSection>
            <S.TextRow>
              <Icon
                name="Headphones"
                weight="fill"
                size={24}
                color={theme.colors.purple_04}
              />
              <Label
                typography={theme.typography.paragraph.m3}
                color={theme.colors.gray_08}
                text="Fale Conosco"
              />
            </S.TextRow>
            <Label
              typography={theme.typography.paragraph.r3}
              color={theme.colors.gray_06}
              text="Lorem ipsum dolor sit amet consectetur. Quis a neque"
              textAlign="left"
            />
          </S.TextSection>
        </S.ContentRow>
      </S.Container>
      <S.ImageWrapper>
        <S.NurseImage
          source={require('../../../../../assets/illustrations/contact-nurse.png')}
        />
      </S.ImageWrapper>
    </S.Outer>
  );
};

export default ContactUsCard;
