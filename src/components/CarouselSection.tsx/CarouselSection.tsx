import Carousel, {CarouselProps} from '../Carousel/Carousel';
import Label from '../Label/Label';
import * as S from './styles';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface CarouselSectionProps<T> {
  carouselData: CarouselProps<T>;
  sectionTitle?: string;
}

const CarouselSection = <T,>({
  carouselData,
  sectionTitle,
}: CarouselSectionProps<T>) => {
  const theme = useDynamicTheme();

  return (
    <S.Section>
      {sectionTitle && (
        <Label
          typography={theme.typography.paragraph.sb3}
          color={theme.colors.gray_08}
          text={sectionTitle}
        />
      )}
      <Carousel {...carouselData} />
    </S.Section>
  );
};

export default CarouselSection;
