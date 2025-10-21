import Icon from '../../../../../components/Icon/Icon';
import Label from '../../../../../components/Label/Label';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';
import * as S from './styles';

export interface ContactUsCardProps {
  onPress: () => void;
};

const ContactUsCard: React.FC<ContactUsCardProps> = ({onPress}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Outer onPress={onPress} activeOpacity={0.8}>
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
              text="Em caso de dúvidas, críticas ou sugestões, entre em contato com a nossa equipe de suporte."
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
