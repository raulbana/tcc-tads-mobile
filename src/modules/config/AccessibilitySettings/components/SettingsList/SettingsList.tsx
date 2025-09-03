import React from 'react';
import SettingItem, {SettingItemProps} from './components/SettingItem';
import {FlatList} from 'react-native';

export interface SettingsListProps {
  items: SettingItemProps[];
}

const SettingsList: React.FC<SettingsListProps> = ({items}) => {
  return (
    <FlatList
      data={items}
      renderItem={({item}) => <SettingItem {...item} />}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default SettingsList;
