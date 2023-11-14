import { createBox } from '@shopify/restyle';
import React from 'react';
import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps
} from 'react-native';
import { ThemeType } from '../../theme';

export const Pressable = createBox<ThemeType, RNPressableProps>(RNPressable);
export type PressableProps = React.ComponentProps<typeof Pressable>;
