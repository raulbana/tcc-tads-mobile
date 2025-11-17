import React from 'react';
import {ScrollView} from 'react-native';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import Label from '../../../../../components/Label/Label';
import UploadBox from './UploadBox/UploadBox';
import CategorySelector from './CategorySelector/CategorySelector';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import useUploadContentForm from './useUploadContentForm';
import {Content} from '../../../../../types/content';
import * as S from './styles';
import {Controller} from 'react-hook-form';

interface UploadContentFormProps {
  parentScrollRef?: any;
  initialContent?: Content | null;
}

const UploadContentForm: React.FC<UploadContentFormProps> = ({
  parentScrollRef,
  initialContent,
}) => {
  const theme = useDynamicTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
    filesList,
    categoriesList,
    isLoading,
    uploadError,
    handleSave,
    handleCancel,
    handleRemoveFile,
    handleUpdateFiles,
    handleCategoryToggle,
    title,
    description,
    DialogPortal,
  } = useUploadContentForm(initialContent);

  return (
    <ScrollView
      ref={parentScrollRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={S.scrollContentStyle}>
      <S.Container>
        <S.Section>
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.gray_08}
            text="Informações do Post"
          />

          <S.InputContainer>
            <Controller
              control={control}
              name="title"
              render={({field}) => (
                <Input
                  label="Título"
                  placeholder="Digite o título do post"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.title?.message}
                  required
                />
              )}
            />
          </S.InputContainer>

          <S.InputContainer>
            <Controller
              control={control}
              name="description"
              render={({field}) => (
                <Input
                  label="Descrição"
                  placeholder="Digite a descrição do post"
                  value={field.value || ''}
                  onChange={field.onChange}
                  error={errors.description?.message}
                  multiline
                  numberOfLines={4}
                />
              )}
            />
          </S.InputContainer>
        </S.Section>

        <S.Section>
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.gray_08}
            text="Mídia"
          />

          <UploadBox
            allowedTypes={['image', 'video']}
            onRemoveFile={handleRemoveFile}
            onUpdateFiles={handleUpdateFiles}
            onReorderFiles={handleUpdateFiles}
            title={title}
            description={description}
            parentScrollRef={parentScrollRef}
            externalError={uploadError}
            initialFiles={filesList}
          />
        </S.Section>

        <S.Section>
          <Label
            typography={theme.typography.paragraph.sb3}
            color={theme.colors.gray_08}
            text="Categorias"
          />

          <CategorySelector
            categories={categoriesList}
            onToggleCategory={handleCategoryToggle}
          />
        </S.Section>

        {uploadError && (
          <S.ErrorContainer>
            <Label
              typography={theme.typography.paragraph.sm1}
              color={theme.colors.error}
              text={uploadError}
            />
          </S.ErrorContainer>
        )}

        <S.ActionButtons>
          <S.ButtonContainer>
            <Button
              type="SECONDARY"
              text={
                <Label
                  typography={theme.typography.paragraph.sb2}
                  text="Cancelar"
                  color={theme.colors.purple_04}
                />
              }
              onPress={handleCancel}
            />
          </S.ButtonContainer>
          <S.ButtonContainer>
            <Button
              type="PRIMARY"
              text={
                <Label
                  typography={theme.typography.paragraph.sb2}
                  text="Salvar Alterações"
                  color={theme.colors.white}
                />
              }
              onPress={handleSubmit(handleSave)}
              disabled={isLoading}
              loading={isLoading}
            />
          </S.ButtonContainer>
        </S.ActionButtons>
      </S.Container>
      {DialogPortal}
    </ScrollView>
  );
};

export default UploadContentForm;
