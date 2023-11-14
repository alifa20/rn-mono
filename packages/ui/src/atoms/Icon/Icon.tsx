import {
  Feather,
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo
} from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';
import React from 'react';

const featherIcons = Feather.getRawGlyphMap();
const materialIcons = MaterialIcons.getRawGlyphMap();
const ionIcons = Ionicons.getRawGlyphMap();
const antDesignIcons = AntDesign.getRawGlyphMap();
const entypoIconNames = Entypo.getRawGlyphMap();

type FeatherIconNames = keyof typeof featherIcons;
type MaterialIconNames = keyof typeof materialIcons;
type IonIconNames = keyof typeof ionIcons;
type AntDesignIconNames = keyof typeof antDesignIcons;
type EntypoIconNames = keyof typeof entypoIconNames;
export type IconType =
  | 'feather'
  | 'materialicons'
  | 'ionicons'
  | 'antdesign'
  | 'entypo'
  | 'custom';

type IconTypes<T extends IconType> = {
  iconType: T;
  iconName: T extends 'feather'
    ? FeatherIconNames
    : T extends 'materialicons'
    ? MaterialIconNames
    : T extends 'ionicons'
    ? IonIconNames
    : T extends 'antdesign'
    ? AntDesignIconNames
    : T extends 'entypo'
    ? EntypoIconNames
    : never;
};

type SizeType = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type Props<T extends IconType> = IconTypes<T> & {
  size?: SizeType;
  className?: string;
  color?: string | OpaqueColorValue | undefined;
};

export type IconProps = Props<IconType>;

export const Icon = <T extends IconType>({
  iconType,
  iconName,
  size = 'medium',
  ...props
}: Props<T>) => {
  const sizeStyle: Record<SizeType, number> = {
    xsmall: 8,
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 40
  };

  if (iconType === 'feather') {
    return (
      <Feather
        name={iconName as FeatherIconNames}
        size={sizeStyle[size]}
        color={'black'}
        {...props}
      />
    );
  }

  if (iconType === 'materialicons') {
    return (
      <MaterialIcons
        name={iconName as MaterialIconNames}
        size={sizeStyle[size]}
        color={'black'}
        {...props}
      />
    );
  }

  if (iconType === 'ionicons') {
    return (
      <Ionicons
        name={iconName as IonIconNames}
        size={sizeStyle[size]}
        color={'black'}
        {...props}
      />
    );
  }

  if (iconType === 'antdesign') {
    return (
      <AntDesign
        name={iconName as AntDesignIconNames}
        size={sizeStyle[size]}
        color={'black'}
        {...props}
      />
    );
  }

  if (iconType === 'entypo') {
    return (
      <Entypo
        name={iconName as EntypoIconNames}
        size={sizeStyle[size]}
        color={'black'}
        {...props}
      />
    );
  }

  if (iconType === 'custom') {
  }

  return <></>;
};
