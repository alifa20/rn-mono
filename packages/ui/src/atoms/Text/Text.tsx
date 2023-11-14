import { createText } from '@shopify/restyle';
import { TextProps as RNTextProps } from 'react-native';

import { ThemeType } from '../../theme';

export const Text = createText<ThemeType, RNTextProps>();
export type TextProps = React.ComponentProps<typeof Text>;
