import React from 'react';
import Label from '../../../../../components/Label/Label';
import {useDynamicTheme} from '../../../../../hooks/useDynamicTheme';
import * as S from './styles';

export type ContentTab = 'saved' | 'own';

export interface ContentTabsProps {
  activeTab: ContentTab;
  onTabChange: (tab: ContentTab) => void;
}

const ContentTabs: React.FC<ContentTabsProps> = ({activeTab, onTabChange}) => {
  const theme = useDynamicTheme();

  return (
    <S.Container>
      <S.TabButton
        active={activeTab === 'saved'}
        onPress={() => onTabChange('saved')}>
        <Label
          typography={theme.typography.paragraph.sb2}
          color={
            activeTab === 'saved'
              ? theme.colors.purple_04
              : theme.colors.gray_06
          }
          text="Conteúdos Salvos"
        />
      </S.TabButton>

      <S.TabButton
        active={activeTab === 'own'}
        onPress={() => onTabChange('own')}>
        <Label
          typography={theme.typography.paragraph.sb2}
          color={
            activeTab === 'own' ? theme.colors.purple_04 : theme.colors.gray_06
          }
          text="Meus Conteúdos"
        />
      </S.TabButton>
    </S.Container>
  );
};

export default ContentTabs;
