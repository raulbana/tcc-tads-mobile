import React from 'react';
import * as S from './styles';
import Icon from '../Icon/Icon';
import Label from '../Label/Label';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

export interface UploadCardRowProps {
  fileName: string;
  fileSize: string;
  onPress?: () => void;
  onRemove?: () => void;
}

const UploadCardRow: React.FC<UploadCardRowProps> = ({
  fileName,
  fileSize,
  onPress,
  onRemove,
}) => {

  const theme = useDynamicTheme();
  
  return (
    <S.Container activeOpacity={onPress ? 0.8 : 1} onPress={onPress}>
      <S.IconWrapper>
        <Icon
          name="ImageSquare"
          size={28}
          color={theme.colors.purple_04}
          weight="bold"
        />
      </S.IconWrapper>

      <S.InfoWrapper>
        <Label
          text={fileName}
          typography={theme.typography.paragraph.sb2}
          color={theme.colors.gray_08}
          numberOfLines={1}
        />
        <Label
          text={fileSize}
          typography={theme.typography.paragraph.sm2}
          color={theme.colors.gray_06}
        />
      </S.InfoWrapper>

      {onRemove && (
        <S.RemoveButton onPress={onRemove} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Icon name="X" size={20} color={theme.colors.error} weight="bold" />
        </S.RemoveButton>
      )}
    </S.Container>
  );
};

export default UploadCardRow;