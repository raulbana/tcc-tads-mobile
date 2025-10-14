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
import Button from '../../../../../components/Button/Button';

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
    onSubmitFiles,
    onRemoveFile,
    onUpdateFiles,
    titleText,
    descriptionText,
    categoriesList,
    isLoading,
    uploadError,
  } = useUploadContentForm();
  return (
    <S.Container>
      <S.FieldGroup>
        <Label
          text="Mídia"
          typography={theme.typography.paragraph.r3}
          color={theme.colors.gray_08}
        />
        <UploadBox
          allowedTypes={['image', 'video']}
          onSubmitFiles={onSubmitFiles}
          onRemoveFile={onRemoveFile}
          onReorderFiles={onUpdateFiles}
          onUpdateFiles={onUpdateFiles}
          title={titleText}
          description={descriptionText}
          parentScrollRef={parentScrollRef}
          externalError={uploadError}
        />
      </S.FieldGroup>
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
          <Controller
            control={control}
            name="subtitle"
            render={({field}) => (
              <Input
                {...register('subtitle')}
                {...field}
                value={field.value ?? ''}
                placeholder="Digite o subtítulo"
                error={errors.subtitle?.message}
                label="Subtítulo"
              />
            )}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <Controller
            control={control}
            name="subcontent"
            render={({field}) => (
              <Input
                {...register('subcontent')}
                {...field}
                value={field.value ?? ''}
                placeholder="Digite o subconteúdo"
                error={errors.subcontent?.message}
                label="Subconteúdo"
              />
            )}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <CarouselSection
            carouselData={{
              data: categoriesList,
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
      <S.ButtonContainer>
        <Button
          text={isLoading ? 'Publicando...' : 'Publicar Conteúdo'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default UploadContentForm;
