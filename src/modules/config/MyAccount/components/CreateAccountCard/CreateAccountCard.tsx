import * as S from './styles';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import {CheckCircle} from 'phosphor-react-native';
import AnonymousUserProfileImage from '../../../../../assets/illustrations/anonymous_user.svg';
import { useDynamicTheme } from '../../../../../hooks/useDynamicTheme';

export interface CreateAccountCardProps {
  advantages: string[];
  onCreateAccount: () => void;
}

const CreateAccountCard: React.FC<CreateAccountCardProps> = ({
  advantages,
  onCreateAccount,
}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Container>
      <S.Section style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <S.AvatarCircle>
          <AnonymousUserProfileImage width={40} height={40} />
        </S.AvatarCircle>
        <Label
          typography={theme.typography.paragraph.m3}
          color={theme.colors.gray_08}
          text="Usuário anônimo"
        />
      </S.Section>
      <S.Section>
        <Label
          typography={theme.typography.paragraph.r2}
          color={theme.colors.gray_06}
          text="Crie sua conta grátis para ter acesso a todos recursos personalizados e conteúdos exclusivos."
        />
      </S.Section>
      <S.Divider />
      <S.Section>
        {advantages.map((adv, idx) => (
          <S.AdvantageRow key={idx}>
            <CheckCircle size={16} color={theme.colors.purple_03} />
            <Label
              typography={theme.typography.paragraph.r2}
              color={theme.colors.gray_06}
              text={adv}
            />
          </S.AdvantageRow>
        ))}
      </S.Section>
      <Button
        type="PRIMARY"
        text={
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.white}
            text="Criar Conta Gratuita"
          />
        }
        onPress={onCreateAccount}
      />
    </S.Container>
  );
};

export default CreateAccountCard;
