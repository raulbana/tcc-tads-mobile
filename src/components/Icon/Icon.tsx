import React from 'react';
import * as PhosphorIcons from 'phosphor-react-native';

export interface IconProps {
  name: keyof typeof PhosphorIcons;
  size?: number;
  color?: string;
  weight?: 'regular' | 'bold' | 'duotone' | 'fill' | 'light' | 'thin';
  style?: object;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000',
  weight = 'regular',
  style,
}) => {
  const IconComponent = PhosphorIcons[name];
  if (!IconComponent) return null;
  return (
    <IconComponent size={size} color={color} weight={weight} style={style} />
  );
};

export default Icon;
