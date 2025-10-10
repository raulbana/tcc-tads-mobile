import {Controller} from 'react-hook-form';
import Input from '../../../../../components/Input/Input';
import Label from '../../../../../components/Label/Label';
import theme from '../../../../../theme/theme';
import * as S from './styles';
import useUploadContentForm from './useUploadContentForm';
import Badge from '../../../../../components/Badge/Badge';
import CarouselSection from '../../../../../components/CarouselSection.tsx/CarouselSection';
import UploadBox from '../UploadBox/UploadBox';
import {UploadFile} from '../UploadBox/useUpload';

interface UploadContentFormProps {
  parentScrollRef?: any;
}

const UploadContentForm: React.FC<UploadContentFormProps> = ({
  parentScrollRef,
}) => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    register,
    onSelectCategory,
    title,
    description,
    onSubmitFiles,
    onRemoveFile,
    onUpdateFiles,
  } = useUploadContentForm();
  return (
    <S.Container>
      <UploadBox
        allowedTypes={['image', 'video']}
        onSubmitFiles={onSubmitFiles}
        onRemoveFile={onRemoveFile}
        onReorderFiles={onUpdateFiles}
        onUpdateFiles={onUpdateFiles}
        title={title}
        description={description}
        parentScrollRef={parentScrollRef}
      />
      <S.FormContainer>
        <S.FieldGroup>
          <Controller
            control={control}
            name="title"
            render={({field}) => (
              <Input
                {...register('title')}
                {...field}
                placeholder="Digite o título"
                error={errors.title?.message}
                label="Título"
              />
            )}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <Controller
            control={control}
            name="description"
            render={({field}) => (
              <Input
                {...register('description')}
                {...field}
                placeholder="Digite a descrição"
                error={errors.description?.message}
                label="Descrição"
              />
            )}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <CarouselSection
            carouselData={{
              data: [
                {
                  content: 'Categoria 1',
                  textColor: theme.colors.gray_08,
                  backgroundColor: theme.colors.gray_03,
                },
              ],
              itemWidth: 100,
              renderItem: ({item}) => (
                <Badge
                  {...item}
                  onPress={() => onSelectCategory(item.content)}
                />
              ),
            }}
            sectionTitle="Categoria"
          />
        </S.FieldGroup>
      </S.FormContainer>
    </S.Container>
  );
};

export default UploadContentForm;
