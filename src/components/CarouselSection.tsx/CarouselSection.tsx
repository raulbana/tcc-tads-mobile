import theme from '../../theme/theme';
import Carousel, {CarouselProps} from '../Carousel/Carousel';
import Label from '../Label/Label';
import * as S from './styles';

export interface CarouselSectionProps<T> {
  carouselData: CarouselProps<T>;
  sectionTitle: string;
}

const CarouselSection = <T,>({
  carouselData,
  sectionTitle,
}: CarouselSectionProps<T>) => {
  return (
    <S.Section>
      <Label
        typography={theme.typography.paragraph.sb3}
        color={theme.colors.gray_08}
        text={sectionTitle}
      />
      <Carousel {...carouselData} />
    </S.Section>
  );
};

export default CarouselSection;
