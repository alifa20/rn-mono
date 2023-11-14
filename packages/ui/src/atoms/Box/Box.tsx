import { createBox } from '@shopify/restyle';
import { ThemeType } from '../../theme/theme';

export const Box = createBox<ThemeType>();
export type BoxProps = React.ComponentProps<typeof Box>;
