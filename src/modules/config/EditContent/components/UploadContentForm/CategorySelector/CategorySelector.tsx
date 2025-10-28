import React from 'react';
import {TouchableOpacity} from 'react-native';
import Label from '../../../../../../components/Label/Label';
import * as S from './styles';
import { useDynamicTheme } from '../../../../../../hooks/useDynamicTheme';

interface CategorySelectorProps {
  categories: any[];
  onToggleCategory: (category: any) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  onToggleCategory,
}) => {

  const theme = useDynamicTheme();

  return (
    <S.Container>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onToggleCategory(category)}
          style={[
            S.categoryButtonStyle,
            {
              backgroundColor: category.backgroundColor,
            },
          ]}>
          <Label
            typography={theme.typography.paragraph.sb2}
            color={theme.colors.gray_08}
            text={category.content}
          />
        </TouchableOpacity>
      ))}
    </S.Container>
  );
};

export default CategorySelector;
