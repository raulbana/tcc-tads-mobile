import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../../navigation/routes';
import {useBottomStack} from './useBottomStack';
import * as S from './styles';
import BottomStackItem from './components/BottomStackItem/BottomStackItem';

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomStack: React.FC = () => {
  const {items, activeColor, inactiveColor} = useBottomStack();

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={({state, navigation}) => (
        <S.BarContainer>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const cfg = items.find(i => i.name === route.name);
            if (!cfg) return null;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name as keyof MainTabParamList);
              }
            };
            return (
              <BottomStackItem
                key={route.key}
                item={cfg}
                focused={focused}
                onPress={onPress}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
              />
            );
          })}
        </S.BarContainer>
      )}>
      {items.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomStack;
